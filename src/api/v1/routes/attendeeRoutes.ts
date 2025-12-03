import express, { Router } from "express";
import * as attendeeController from "../controllers/attendeeController";
import { validateRequest } from "../middleware/validate";
import { attendeeSchemas } from "../validations/attendeeValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Attendees
 *   description: Manage event attendees
 */

/**
 * @openapi
 * /api/v1/events/{id}/attendees:
 *   get:
 *     summary: Get all attendees for an event
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: List of attendees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:id/attendees",
  authenticate,
  isAuthorized({ hasRole: ["organizer", "admin"] }),
  attendeeController.getAllAttendees
);

/**
 * @openapi
 * /api/v1/events/{id}/attendees:
 *   post:
 *     summary: Add an attendee to an event
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendee'
 *     responses:
 *       201:
 *         description: Attendee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post(
  "/:id/attendees",
  authenticate,
  isAuthorized({ hasRole: ["user", "organizer", "admin"] }),
  validateRequest(attendeeSchemas.create),
  attendeeController.addAttendee
);

/**
 * @openapi
 * /api/v1/events/{id}/attendees/{attendeeId}:
 *   get:
 *     summary: Get a single attendee by ID
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: attendeeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.get(
  "/:id/attendees/:attendeeId",
  authenticate,
  isAuthorized({ hasRole: ["organizer", "admin"] }),
  attendeeController.getAttendeeById
);

/**
 * @openapi
 * /api/v1/events/{id}/attendees/{attendeeId}:
 *   delete:
 *     summary: Remove an attendee from an event
 *     tags: [Attendees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: attendeeId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendee removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete(
  "/:id/attendees/:attendeeId",
  authenticate,
  isAuthorized({ hasRole: ["organizer", "admin"] }),
  validateRequest(attendeeSchemas.remove),
  attendeeController.deleteAttendee
);

export default router;
