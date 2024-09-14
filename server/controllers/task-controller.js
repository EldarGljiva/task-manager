import {
  addNewTask,
  deleteTaskById,
  updateTaskById,
  getTasksByUserId,
} from "../models/task-model.js";
import {} from "../models/user-model.js";

// Controller function to get tasks by user_id
export const getTasks = async (req, res) => {
  const userId = req.params.userId; // Get user ID from request
  try {
    const tasks = await getTasksByUserId(userId); // Get tasks from the database
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};

// Controller function to add a new task
export const addTask = async (req, res) => {
  const { user_id, title, description } = req.body; // Get task info from request
  if (!user_id || !title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newTask = await addNewTask(user_id, title, description); // Add task to database
    res.status(201).json({ message: "New task added succesfully", newTask });
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};

// Controller function to delete a task
export const deleteTask = async (req, res) => {
  const taskId = req.params.id; // Get task ID from request
  try {
    const deletedTask = await deleteTaskById(taskId); // Delete task from database
    if (deletedTask != null) {
      res.status(200).json({ message: "Task deleted succesfully", deleteTask });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};

// Controller function to edit a task
export const updateTask = async (req, res) => {
  const taskId = req.params.id; // Get task ID from request
  const { title, description } = req.body; // Get updated task info from request
  try {
    const updatedTask = await updateTaskById(title, description, taskId); // Update task in database
    if (updatedTask != null) {
      res.status(200).json({ message: "Task updated succesfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};
