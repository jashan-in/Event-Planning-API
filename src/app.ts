import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"; 
import morgan from "morgan"; 
import eventRoutes from "./api/v1/routes/eventRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Event Planning API is running..." });
});

// Routes
app.use("/api/v1/events", eventRoutes);
export default app;
