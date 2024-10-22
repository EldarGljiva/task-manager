import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./AddTaskForm.css";

const AddTaskForm = () => {
  // Initialize state for task title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Handle form submission logic
  const handleSubmit = async (e) => {
    // Prevent page refresh on form submit
    e.preventDefault();

    // Retrieve token from local storage to get user ID
    const token = localStorage.getItem("token");
    let userId = null;
    if (token) {
      try {
        // Decode token if available, and extract user ID
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
    // If user ID exists, proceed with task submission
    if (userId) {
      try {
        // Send POST request to the backend ( using axios ) to add the task
        const response = await axios.post(
          "api/tasks",
          {
            user_id: userId,
            title,
            description,
          },
          {
            // Set headers for the request
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Show success notification, reset form, and navigate to tasks page
        toast.success("Task added successfully!");
        setTitle("");
        setDescription("");
        navigate("/tasks");
      } catch (error) {
        console.error("Error adding task", error);
        toast.error(error.response?.data.message || "Failed to add task.");
      }
    } else {
      // If user ID is not found, show error message
      console.error("User ID not found.");
      toast.error("Failed to add task. User not authenticated.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center custom-container"
      style={{ marginTop: 50 }}
    >
      <div className="border shadow-lg p-5 custom-border container-lg">
        <h2 style={{ color: "#333333" }}>Add a New Task</h2>
        <p style={{ color: "#555555" }}>
          Please fill out the details below to add a new task.
        </p>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group mb-3">
            <label htmlFor="title" style={{ color: "#555555" }}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control w-100"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description" style={{ color: "#555555" }}>
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control w-100 border input-border"
              rows="4"
              autoComplete="off"
              required
            />
          </div>
          <div className="container-for-add-button d-flex justify-content-center align-items-center">
            <button type="submit" className="btn custom-add-button w-100">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
