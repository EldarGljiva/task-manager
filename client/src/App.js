import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  const gradientBackground = {
    background:
      "linear-gradient(0deg, rgba(179, 229, 252, 1) 0%, rgba(129, 212, 250, 1) 100%)",
    minHeight: "100vh",
    margin: 0,
    position: "relative",
  };
  return (
    <div style={gradientBackground}>
      <div className="bubble1"></div>
      <div className="bubble2"></div>
      <div className="bubble3"></div>
      <Router>
        {/* Navbar will be present on every route */}
        <Navbar />
        <div className="content">
          {/* Define all routes for the app */}
          <Routes>
            {/* Redirect root URL ("/") to the login page */}
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Protected route for Home page */}
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            {/* Protected route for Tasks page */}
            <Route
              path="/tasks"
              element={<PrivateRoute element={<Tasks />} />}
            />
            {/* Protected route for AddTask page */}
            <Route
              path="/add-task"
              element={<PrivateRoute element={<AddTask />} />}
            />
            {/* Public route for Login page */}
            <Route path="/login" element={<Login />} />

            {/* Public route for Register page */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
