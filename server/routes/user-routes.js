import express from "express";
import {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user-controller.js";

const router = express.Router(); // Create a new router object

// Route to get all users
router.get("/users", getUsers);
// Route to get a user by id
router.get("/users/:id", getUser);
// Route to register a new user
router.post("/register", registerUser);
// Route to update an existing user
router.put("/users/:id", updateUser);
// Route to delete a user
router.delete("/users/:id", deleteUser);
// Route to login a user
router.post("/login", loginUser);

export default router;
