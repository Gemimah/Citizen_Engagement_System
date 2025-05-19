import express, { Response, NextFunction, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Complaint, ComplaintRequestBody } from "../types";
import { categorizeComplaint } from "../nlpRouter";
import { sendStatusUpdateNotification } from "../notificationService";
import { validateComplaint } from "../middleware/validateComplaint";
import { AppError } from "../middleware/errorHandler";
import pool from "../config/database";

const router = express.Router();

// Get all complaints (with filtering and pagination)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, category, agency, page = 1, limit = 10 } = req.query;
    let query = "SELECT * FROM complaints";
    const params: any[] = [];
    const conditions: string[] = [];

    if (status) {
      conditions.push("status = $" + (params.length + 1));
      params.push(status);
    }
    if (category) {
      conditions.push("category = $" + (params.length + 1));
      params.push(category);
    }
    if (agency) {
      conditions.push("agency = $" + (params.length + 1));
      params.push(agency);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Add pagination
    const offset = (Number(page) - 1) * Number(limit);
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    const totalResult = await pool.query("SELECT COUNT(*) FROM complaints");
    const total = parseInt(totalResult.rows[0].count);

    res.json({
      complaints: result.rows,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    next(new AppError("Failed to fetch complaints", 500));
  }
});

// Get a specific complaint
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      "SELECT c.*, json_agg(u.*) as updates FROM complaints c LEFT JOIN complaint_updates u ON c.id = u.complaint_id WHERE c.id = $1 GROUP BY c.id",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return next(new AppError("Complaint not found", 404));
    }

    const complaint = result.rows[0];
    complaint.updates = complaint.updates[0] === null ? [] : complaint.updates;
    res.json(complaint);
  } catch (error) {
    next(new AppError("Failed to fetch complaint", 500));
  }
});

// Submit a new complaint
router.post(
  "/",
  validateComplaint,
  async (
    req: Request<{}, {}, ComplaintRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { title, description, category, userEmail, userPhone } = req.body;
      const id = uuidv4();
      const complaintCategory: string =
        category || (await categorizeComplaint({ description } as Complaint));
      const agency = determineAgency(complaintCategory);

      // Insert complaint
      const complaintResult = await client.query(
        `INSERT INTO complaints (
          id, title, description, category, status, priority, agency, 
          user_email, user_phone, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *`,
        [
          id,
          title,
          description,
          complaintCategory,
          "pending",
          determinePriority(req.body),
          agency,
          userEmail,
          userPhone,
        ]
      );

      // Insert initial update
      await client.query(
        `INSERT INTO complaint_updates (
          complaint_id, status, message
        ) VALUES ($1, $2, $3)`,
        [id, "pending", "Complaint submitted successfully"]
      );

      await client.query("COMMIT");

      const newComplaint = complaintResult.rows[0];

      // Send notification if email is provided
      if (userEmail) {
        try {
          const initialUpdate = {
            id: uuidv4(),
            complaint_id: id,
            timestamp: new Date().toISOString(),
            status: "pending" as const,
            message: "Complaint submitted successfully",
          };

          await sendStatusUpdateNotification({
            id,
            title,
            description,
            category: complaintCategory,
            status: "pending",
            priority: determinePriority(req.body),
            agency,
            userEmail,
            userPhone,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updates: [initialUpdate],
          });
        } catch (error) {
          console.error("Failed to send notification:", error);
        }
      }

      res.status(201).json(newComplaint);
    } catch (error) {
      await client.query("ROLLBACK");
      next(new AppError("Failed to create complaint", 500));
    } finally {
      client.release();
    }
  }
);

// Update complaint status
router.patch(
  "/:id/status",
  async (req: Request, res: Response, next: NextFunction) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { status } = req.body;
      const { id } = req.params;

      // Update complaint
      const result = await client.query(
        `UPDATE complaints 
         SET status = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2 
         RETURNING *`,
        [status, id]
      );

      if (result.rows.length === 0) {
        await client.query("ROLLBACK");
        return next(new AppError("Complaint not found", 404));
      }

      // Add status update
      await client.query(
        `INSERT INTO complaint_updates (
          complaint_id, status, message
        ) VALUES ($1, $2, $3)`,
        [id, status, `Status updated to ${status}`]
      );

      await client.query("COMMIT");

      // Get updated complaint with all updates
      const updatedComplaint = await client.query(
        `SELECT c.*, json_agg(u.*) as updates 
         FROM complaints c 
         LEFT JOIN complaint_updates u ON c.id = u.complaint_id 
         WHERE c.id = $1 
         GROUP BY c.id`,
        [id]
      );

      res.json(updatedComplaint.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      next(new AppError("Failed to update complaint status", 500));
    } finally {
      client.release();
    }
  }
);

// Add response to complaint
router.post(
  "/:id/response",
  async (req: Request, res: Response, next: NextFunction) => {
    const client = await pool.connect();
    try {
      const { message, responder } = req.body;
      const { id } = req.params;

      // Get the complaint
      const result = await client.query(
        "SELECT * FROM complaints WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return next(new AppError("Complaint not found", 404));
      }

      // Add response to complaint_updates
      await client.query(
        `INSERT INTO complaint_updates (
          complaint_id, status, message, responder
        ) VALUES ($1, $2, $3, $4)`,
        [id, "in_progress", message, responder]
      );

      // Get updated complaint with all updates
      const updatedComplaint = await client.query(
        `SELECT c.*, json_agg(u.*) as updates 
         FROM complaints c 
         LEFT JOIN complaint_updates u ON c.id = u.complaint_id 
         WHERE c.id = $1 
         GROUP BY c.id`,
        [id]
      );

      res.json(updatedComplaint.rows[0]);
    } catch (error) {
      next(new AppError("Failed to add response", 500));
    } finally {
      client.release();
    }
  }
);

// Helper functions
function determinePriority(
  complaint: ComplaintRequestBody
): "low" | "medium" | "high" {
  // Implement priority determination logic based on category, description, etc.
  return "medium";
}

function determineAgency(category: string): string {
  const agencyMap: { [key: string]: string } = {
    "Road Maintenance": "Department of Public Works",
    "Public Transport": "Transportation Authority",
    "Waste Management": "Sanitation Department",
    Other: "General Services",
  };
  return agencyMap[category] || "General Services";
}

export { router as complaintsRouter };
