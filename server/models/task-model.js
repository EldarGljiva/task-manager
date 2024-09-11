import db from "../config/database.js";

// Get a task by user id
export const getTasksByUserId = async (userId) => {
  const result = await db.query("SELECT * FROM tasks WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
};

// Add new task
export const addNewTask = async (user_id, title, description) => {
  const result = await db.query(
    "INSERT INTO tasks(user_id, title, description) VALUES($1,$2,$3) RETURNING *",
    [user_id, title, description]
  );
  return result.rows[0];
};

// Delete task
export const deleteTaskById = async (id) => {
  const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

// Edit task
export const updateTaskById = async (title, description, id) => {
  const result = await db.query(
    "UPDATE tasks SET title=$1, description=$2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );
  return result.rows[0];
};
