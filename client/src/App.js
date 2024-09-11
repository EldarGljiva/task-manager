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

const App = () => {
  return (
    <Router>
      {/* Navbar will be present on every route */}
      <Navbar />
      {/* Define all routes for the app */}
      <Routes>
        {/* Redirect root URL ("/") to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Protected route for Home page */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        {/* Protected route for Tasks page */}
        <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
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
      <ToastContainer />
    </Router>
  );
};

export default App;
