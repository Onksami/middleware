import express from "express";
const app = express();
const PORT = 3009;

// Middleware for logging requests
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  // Example logic: Check for a custom header 'x-auth-token'
  const authToken = req.headers["x-auth-token"];
  if (authToken && authToken === "secret-token") {
    next(); // User is authenticated
  } else {
    res.status(401).send("Unauthorized"); // User is not authenticated
  }
};

// Apply the logging middleware globally
app.use(requestLogger);

// Public route
app.get("/", (req, res) => {
  res.send("Welcome to the Express app!");
});

// Protected route that requires authentication
app.get("/protected", authenticateUser, (req, res) => {
  res.send("This is a protected route. You are authenticated!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
