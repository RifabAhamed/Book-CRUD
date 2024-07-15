import express from "express";
import cors from "cors";
import bookRoute from "./route/bookRoute.js";


const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Health-check route
app.get("/v1/sample/health-check", (req, res) => {
  res.status(200).json({ status: "Server is up and running" });
});

// Routes
app.use("/v1/sample/book", bookRoute);

export default app;
