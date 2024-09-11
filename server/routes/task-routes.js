import express from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task-controller.js";

const router = express.Router(); // Create a new router object

// Route to get tasks by user ID
router.get("/tasks/:userId", getTasks);
// Route to add a new task
router.post("/tasks", addTask);
// Route to delete a task by its ID
router.delete("/tasks/:id", deleteTask);
// Route to update a task by its ID
router.put("/tasks/:id", updateTask);

export default router;
