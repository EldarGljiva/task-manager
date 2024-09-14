import React, { useState } from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  // State variables to hold form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent page from refreshing when form is submitted
    e.preventDefault();
    try {
      // Sending POST request to the registration endpoint
      const response = await axios.post("api/register", {
        name,
        email,
        password,
      });

      // Store token in a variable
      const { token } = response.data;
      // Store token in local storage, redirect to /home and display successful message
      localStorage.setItem("token", token);
      toast.success("Registration successful!");
      navigate("/home");
    } catch (err) {
      toast.error(
        err.response?.data.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center custom-container"
      style={{ marginTop: 35 }}
    >
      <div className="border shadow-lg p-5 custom-border container-lg">
        <h2 className="mb-5" style={{ color: "#333333" }}>
          Register
        </h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group mb-3">
            <label htmlFor="name" style={{ color: "#555555 " }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control w-100"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" style={{ color: "#555555 " }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control w-100 border input-border"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" style={{ color: "#555555 " }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control w-100 border input-border"
              required
            />
          </div>
          <div className="container-for-register-button">
            <button type="submit" className="btn custom-register-button w-100">
              Register
            </button>
          </div>
        </form>
        <div className="text-flex-start mt-3">
          <p style={{ color: "#555555 " }}>
            Already have an account?
            <Link to="/login">
              <span style={{ color: "#2196F3" }}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
