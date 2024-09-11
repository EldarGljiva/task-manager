import React, { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const LoginForm = () => {
  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    // Prevent page refresh on form submit
    e.preventDefault();
    try {
      // Send POST request to login API with email and password ( using axios )
      const response = await axios.post("api/login", {
        email,
        password,
      });

      // get token from response
      const { token } = response.data;
      // Store token in local storage, navigate to /home and show succesfull message
      localStorage.setItem("token", token);
      navigate("/home");
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center custom-container"
      style={{ marginTop: 115 }}
    >
      <div className="border shadow-lg p-5 custom-border container-lg">
        <h2 className="mb-5">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              className="form-control w-100"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              className="form-control w-100 border input-border"
              required
            />
          </div>
          <div className="container-for-login-button">
            <button type="submit" className="btn login-button w-100">
              Login
            </button>
          </div>
        </form>
        <div className="text-flex-start mt-3">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
