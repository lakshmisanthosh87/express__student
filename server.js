import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import path from "path";

dotenv.config(); //MUST be before using process.env
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend
app.use(express.static("public"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`)
});
