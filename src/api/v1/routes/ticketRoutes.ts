import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController";
import { validateRequest } from "../middleware/validate";
import { ticketSchemas } from "../validations/ticketValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Tickets
 *   description: Manage event tickets
 */

/**
 * @openapi
 * /api/v1/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  ticketController.getAllTickets
);

/**
 * @openapi
 * /api/v1/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["user", "organizer", "admin"] }),
  validateRequest(ticketSchemas.create),
  ticketController.createTicket
);

/**
 * @openapi
 * /api/v1/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Ticket not found
 */
router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["organizer", "admin"] }),
  validateRequest(ticketSchemas.delete),
  ticketController.getTicketById
);

/**
 * @openapi
 * /api/v1/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ticket not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["organizer", "admin"] }),
  validateRequest(ticketSchemas.update),
  ticketController.updateTicket
);

/**
 * @openapi
 * /api/v1/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ticket not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  validateRequest(ticketSchemas.delete),
  ticketController.deleteTicket
);

export default router;
