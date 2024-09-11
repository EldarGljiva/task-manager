import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeButtonGroup.css";

const HomeButtonGroup = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 custom-width">
          <div className="d-flex flex-column align-items-center gap-2">
            <Link to="/add-task" className="btn btn-success w-100 p-2">
              Add Task
            </Link>
            <Link to="/tasks" className="btn btn-primary w-100 p-2">
              View Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButtonGroup;
