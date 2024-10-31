const express = require("express");

const app = express();

const PORT = 3008;

app.use(express.json()); // JSON middleware

// Authentication middleware
app.use((req, res, next) => {
  const userAuthenticated = true;
  if (!userAuthenticated) {
    return res.status(403).send("you are not allowed to make this req.");
  }
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`Order received at ${new Date().toLocaleDateString()}`);
  next();
});

// Ingredient availability middleware
app.use((req, res, next) => {
  const ingredientsAvailable = true;
  if (!ingredientsAvailable) {
    return res
      .status(400)
      .send("Sorry, we are out of ingredients for that dish");
  }
  next();
});

// Routes
app.get("/order", (req, res) => {
  res.send("Your food is ready!");
});

const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log("Router-level middleware for /orders");
  next();
});

router.get("/orders", (req, res) => {
  res.send("Here are your orders");
});

app.use("/api", router); // Router kullanımı

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
