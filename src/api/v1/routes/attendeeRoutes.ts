import express, { Router } from "express";
import * as attendeeController from "../controllers/attendeeController";
import { validateRequest } from "../middleware/validate";
import { attendeeSchemas } from "../validations/attendeeValidation";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendees
 *   description: Manage event attendees
 */

/**
 * @swagger
 * /api/v1/events/{id}/attendees:
 *   get:
 *     summary: Get all attendees for an event
 *     tags: [Attendees]
 *   post:
 *     summary: Add an attendee to an event
 *     tags: [Attendees]
 */
router.get("/:id/attendees", attendeeController.getAllAttendees);
router.post(
  "/:id/attendees",
  validateRequest(attendeeSchemas.create),
  attendeeController.addAttendee
);

/**
 * @swagger
 * /api/v1/events/{id}/attendees/{attendeeId}:
 *   get:
 *     summary: Get a single attendee by ID
 *     tags: [Attendees]
 *   delete:
 *     summary: Remove an attendee from an event
 *     tags: [Attendees]
 */
router.get("/:id/attendees/:attendeeId", attendeeController.getAttendeeById);
router.delete(
  "/:id/attendees/:attendeeId",
  validateRequest(attendeeSchemas.remove),
  attendeeController.deleteAttendee
);

export default router;
