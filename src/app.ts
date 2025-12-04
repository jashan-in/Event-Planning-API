import dotenv from "dotenv";
dotenv.config(); 

import express, { Application, Request, Response } from "express";
import morgan from "morgan";

import { getHelmetConfig } from "../configs/helmetConfig";
import { getCorsConfig } from "../configs/corsConfig";

//Node Cron
import "./api/v1/cron/cronJobs";

// Routes
import eventRoutes from "./api/v1/routes/eventRoutes";
import attendeeRoutes from "./api/v1/routes/attendeeRoutes";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

// Swagger
import setupSwagger from "../configs/swagger";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));


// Security middleware 
import helmet from "helmet";
import cors from "cors";

app.use(helmet(getHelmetConfig()));
app.use(cors(getCorsConfig()));

// Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Event Planning API is running..." });
});

// Swagger Documentation
setupSwagger(app);

// Event CRUD routes
app.use("/api/v1/events", eventRoutes);

// Attendee routes nested under events
app.use("/api/v1/events", attendeeRoutes);

// Ticket routes
app.use("/api/v1/tickets", ticketRoutes);

import { errorHandler } from "./api/v1/middleware/errorHandler";
app.use(errorHandler);

export default app;
