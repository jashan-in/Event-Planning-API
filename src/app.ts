import express, { Application, Request, Response } from "express";
import morgan from "morgan";



const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Event Planning API is running..." });
});

export default app;
