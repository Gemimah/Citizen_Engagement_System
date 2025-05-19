import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import complaintsRoutes from "./routes/complaints.js"; // adjust path if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route for handling complaints
app.use("/api/complaints", complaintsRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
