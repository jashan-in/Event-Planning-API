import express, { Router } from "express";
import * as eventController from "../controllers/eventController";
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validations/eventValidation";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 */
router.get("/", eventController.getAllEvents);
router.post("/", validateRequest(eventSchemas.create), eventController.createEvent);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 */
router.get("/:id", eventController.getEventById);
router.put("/:id", validateRequest(eventSchemas.update), eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
