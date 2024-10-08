import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeButtonGroup.css";

const HomeButtonGroup = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 custom-width">
          <div className="d-flex flex-column align-items-center gap-2">
            <Link to="/add-task" className="custom-button">
              Add Task
            </Link>
            <Link to="/tasks" className="custom-button">
              View Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButtonGroup;
