import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { complaintsRouter } from "./routes/complaints";
import { agenciesRouter } from "./routes/agencies";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/complaints", complaintsRouter);
app.use("/api/agencies", agenciesRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on http://localhost:${port}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
