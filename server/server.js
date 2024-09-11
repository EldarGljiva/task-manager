import app from "./app.js";

const port = process.env.PORT || 3000; // Set the port from environment or default to 3000

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
