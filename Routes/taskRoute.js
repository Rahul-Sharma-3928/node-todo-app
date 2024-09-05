import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../Controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createTask);

router.get("/my", isAuthenticated, getTask);

router.put("/update/:id", isAuthenticated, updateTask);

router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;
