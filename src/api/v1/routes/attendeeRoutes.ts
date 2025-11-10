import express, { Router } from "express";
import * as attendeeController from "../controllers/attendeeController";

const router: Router = express.Router();

// "/api/v1/events" prefix is added in app.ts

// Get all attendees for a specific event
router.get("/:id/attendees", attendeeController.getAllAttendees);

// Add a new attendee to a specific event
router.post("/:id/attendees", attendeeController.addAttendee);

// Get a single attendee by ID for a specific event
router.get("/:id/attendees/:attendeeId", attendeeController.getAttendeeById);

// Delete an attendee by ID for a specific event
router.delete("/:id/attendees/:attendeeId", attendeeController.deleteAttendee);

export default router;
