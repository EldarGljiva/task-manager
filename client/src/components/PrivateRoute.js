import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ element }) => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You need to log in to access this page.");
    }
  }, [token]); // Effect runs when token changes

  // If token exists, render the element, otherwise redirect to login
  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
