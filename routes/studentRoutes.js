import express from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

// import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
