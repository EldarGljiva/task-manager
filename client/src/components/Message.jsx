// Message.js
import React from "react";
import { jwtDecode } from "jwt-decode";
import "./Message.css";

const Message = () => {
  // Retrieve and decode the JWT token from local storage
  const token = localStorage.getItem("token");
  let userName = "";
  if (token) {
    try {
      // Decode the JWT token to extract user information
      const decodedToken = jwtDecode(token);
      // Get name of the user and store it in a variable
      userName = decodedToken.name;
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <h3 style={{ marginTop: "100px" }}>Welcome {userName}</h3>
    </div>
  );
};

export default Message;
