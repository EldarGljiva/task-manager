import db from "../config/database.js";

// Get all users
export const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

// Get a user by ID
export const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Add new user
export const addNewUser = async (name, email, password) => {
  const result = await db.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

// Update user
export const updateExistingUser = async (id, name, email, password) => {
  const result = await db.query(
    "UPDATE users SET name=$1,email=$2,password=$3 WHERE id = $4 RETURNING *",
    [name, email, password, id]
  );
  return result.rows[0];
};

// Delete user
export const deleteExistingUser = async (id) => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};

// Get a user by email
export const getUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
