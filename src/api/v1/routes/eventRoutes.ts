import express, { Router } from "express";
import * as eventController from "../controllers/eventController";

const router: Router = express.Router();

// "/api/v1/events" prefix is added in app.ts
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;