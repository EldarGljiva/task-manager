import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../components/FloatingButton";
import { Modal, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./Tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState({
    id: null,
    title: "",
    description: "",
  });

  const navigate = useNavigate(); // navigate hook

  useEffect(() => {
    // Decode token and get userId
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token and extract user id
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
    // Arrow function to get all tasks for logged-in user
    const getTasks = async () => {
      try {
        const response = await axios.get(`api/tasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    // Get all tasks only if user id exists
    if (userId) {
      getTasks();
    }
  }, [userId]); // re run when user id changes

  // Arrow function to handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted succesfully!");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // Arrow function to show task details in modal
  const handleFullDescription = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setSelectedTask(task);
    setShowModal(true);
  };

  // Arrow function to close a modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // Arrow function to edit task
  const handleEdit = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setShowEditModal(true);
  };

  // Arrow function to close modal
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditTask({
      id: null,
      title: "",
      description: "",
    });
  };

  // Arrow function to handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask({
      ...editTask,
      [name]: value,
    });
  };

  // Arrow function to save changes
  const handleSaveChanges = async () => {
    try {
      await axios.put(`api/tasks/${editTask.id}`, {
        title: editTask.title,
        description: editTask.description,
      });
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { ...task, ...editTask } : task
        )
      );
      toast.success("Task updated successfully!");
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="d-flex justify-content-center align-items-center m-3">
        My Tasks
      </h2>
      <FloatingButton onClick={() => navigate("/add-task")} />

      {/* If any task exists then render it */}
      {tasks.length > 0 ? (
        <div className="task-list justify-content-center align-items-center">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={handleEdit}
              onDelete={handleDelete}
              onFullDescription={handleFullDescription}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h5>No tasks found. Press </h5> <Link to="/add-task"> Here </Link>
          <h5> to start</h5>
        </div>
      )}
      {/* Modal Component */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTask?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTask?.description}</p>
        </Modal.Body>
      </Modal>
      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={editTask.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={editTask.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tasks;
