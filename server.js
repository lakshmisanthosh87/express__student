import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import errorHandler from "./utils/errorHandler.js";

dotenv.config();

const app = express();

// Resolve directory (ES modules way)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/students", studentRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
