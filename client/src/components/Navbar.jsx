import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // Initialize navigation hook
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  // Check if a token exists in local storage, turn to boolean value
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand fs-4 custom-primary-text" href="/home">
          Task Manager
        </a>
        <div className="dropdown show">
          <a
            className="dropdown-toggle dropdown-item custom-primary-text"
            href="/"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ fontSize: "1.125rem" }}
          >
            Profile
          </a>

          <div
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuLink"
          >
            <a className="dropdown-item" href="/tasks">
              My Tasks
            </a>
            {/* Conditionally render Logout or Login option based on user authentication */}
            {isLoggedIn ? (
              <a className="dropdown-item" href="/" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <a className="dropdown-item" href="/login">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
