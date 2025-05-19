import express, { Request, Response, NextFunction } from "express";
import { Agency } from "../types";
import { AppError } from "../middleware/errorHandler";

const router = express.Router();

// In-memory storage (replace with database in production)
let agencies: Agency[] = [
  {
    id: "1",
    name: "Department of Public Works",
    description: "Handles road maintenance and infrastructure",
    categories: ["Road Maintenance"],
    contactEmail: "publicworks@city.gov",
    contactPhone: "+1234567890",
    address: "123 Main St, City Hall",
    operatingHours: {
      start: "09:00",
      end: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
  {
    id: "2",
    name: "Transportation Authority",
    description: "Manages public transport and traffic",
    categories: ["Public Transport"],
    contactEmail: "transport@city.gov",
    contactPhone: "+1234567891",
    address: "456 Transit Ave",
    operatingHours: {
      start: "08:00",
      end: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
  {
    id: "3",
    name: "Sanitation Department",
    description: "Handles waste management and recycling",
    categories: ["Waste Management"],
    contactEmail: "sanitation@city.gov",
    contactPhone: "+1234567892",
    address: "789 Clean St",
    operatingHours: {
      start: "07:00",
      end: "16:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
];

// Get all agencies
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(agencies);
  } catch (error) {
    next(new AppError("Failed to fetch agencies", 500));
  }
});

// Get a specific agency
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const agency = agencies.find((a) => a.id === req.params.id);
    if (!agency) {
      return next(new AppError("Agency not found", 404));
    }
    res.json(agency);
  } catch (error) {
    next(new AppError("Failed to fetch agency", 500));
  }
});

// Create new agency
router.post(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const newAgency: Agency = {
        id: Math.random().toString(36).substr(2, 9),
        ...req.body,
      };
      agencies.push(newAgency);
      res.status(201).json(newAgency);
    } catch (error) {
      next(new AppError("Failed to create agency", 500));
    }
  }
);

// Update agency
router.put(
  "/:id",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const agencyIndex = agencies.findIndex((a) => a.id === req.params.id);
      if (agencyIndex === -1) {
        return next(new AppError("Agency not found", 404));
      }

      agencies[agencyIndex] = {
        ...agencies[agencyIndex],
        ...req.body,
        id: agencies[agencyIndex].id,
      };

      res.json(agencies[agencyIndex]);
    } catch (error) {
      next(new AppError("Failed to update agency", 500));
    }
  }
);

// Delete agency
router.delete(
  "/:id",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const agencyIndex = agencies.findIndex((a) => a.id === req.params.id);
      if (agencyIndex === -1) {
        return next(new AppError("Agency not found", 404));
      }

      agencies = agencies.filter((a) => a.id !== req.params.id);
      res.status(204).send();
    } catch (error) {
      next(new AppError("Failed to delete agency", 500));
    }
  }
);

export { router as agenciesRouter };
