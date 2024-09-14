import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateExistingUser,
  getUserByEmail,
  deleteExistingUser,
} from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "validator";
const { isEmail } = pkg;

// Controller function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers(); // Get all users
    if (!users.length) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users", error });
  }
};

// Controller function to get user by ID
export const getUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from request
  try {
    const user = await getUserById(userId); // Get user by ID
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting user", error });
  }
};

// Controller function to register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Get user info from request
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  // Check password length
  if (password.length < 5) {
    return res
      .status(400)
      .json({ message: "Password must be at least 5 characters long" });
  }
  // Check if email is valid
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // Conflict if user exists
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await addNewUser(name, email, hashedPassword); // Add new user to database

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, name: newUser.name },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token, // Send token back to client
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Controller function to update an existing user
export const updateUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from request
  const { name, email, password } = req.body; // Get updated info from request
  if (!name && !email && !password) {
    return res.status(400).json({ message: "No update fields provided" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    const updatedUser = await updateExistingUser(
      userId,
      name,
      email,
      hashedPassword
    ); // Update in database

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated succesfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" }); // User not found
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Controller function to delete an existing user
export const deleteUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from request
  try {
    const deletedUser = await deleteExistingUser(userId); // Delete user from database
    if (deletedUser) {
      res.status(200).json({ message: "User deleted succesfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Controller function to log in a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // Get email and password from request
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await getUserByEmail(email); // Find user in DB by email

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Check password

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};
