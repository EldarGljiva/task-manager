import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user-routes.js";
import taskRoutes from "./routes/task-routes.js";

// Create an Express app
const app = express();

// Middleware setup
app.use(bodyParser.json()); // To parse JSON data in requests
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

// Routes
app.use("/api", userRoutes); // Routes for user-related actions
app.use("/api", taskRoutes); // Routes for task-related actions

export default app;
