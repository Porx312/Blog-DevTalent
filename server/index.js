import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import Connection from "./database/db.js";
// Import the Router from your routes file

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body-parser now built into Express
app.use(express.urlencoded({ extended: true }));

// Use your imported router
app.use("/", router);

// Server Port
const PORT = process.env.PORT || 8000;
Connection()
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling for unhandled routes (optional)
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

// General error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An internal server error occurred" });
});
