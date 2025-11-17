import express, { Router } from "express";
import * as attendeeController from "../controllers/attendeeController";
import { validateRequest } from "../middleware/validate";
import { attendeeSchemas } from "../validations/attendeeValidation";

const router: Router = express.Router();

// Get all attendees for a specific event
router.get("/:id/attendees", attendeeController.getAllAttendees);

// Add a new attendee to a specific event
router.post(
  "/:id/attendees",
  validateRequest(attendeeSchemas.create),
  attendeeController.addAttendee
);

// Get a single attendee by ID for a specific event
router.get("/:id/attendees/:attendeeId", attendeeController.getAttendeeById);

// Delete an attendee by ID for a specific event
router.delete(
  "/:id/attendees/:attendeeId",
  validateRequest(attendeeSchemas.remove),
  attendeeController.deleteAttendee
);

export default router;
