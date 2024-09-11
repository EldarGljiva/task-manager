import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onUpdate, onDelete, onFullDescription }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-actions">
        <button className="btn btn-primary" onClick={() => onUpdate(task.id)}>
          Update
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
        <button
          className="btn btn-success"
          onClick={() => onFullDescription(task.id)}
        >
          Description
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
