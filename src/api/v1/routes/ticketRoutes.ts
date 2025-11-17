import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController";
import { validateRequest } from "../middleware/validate";
import { ticketSchemas } from "../validations/ticketValidation";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Manage event tickets
 */

/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 */
router.get("/", ticketController.getAllTickets);
router.post("/", validateRequest(ticketSchemas.create), ticketController.createTicket);

/**
 * @swagger
 * /api/v1/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 */
router.get("/:id", validateRequest(ticketSchemas.delete), ticketController.getTicketById);
router.put("/:id", validateRequest(ticketSchemas.update), ticketController.updateTicket);
router.delete("/:id", validateRequest(ticketSchemas.delete), ticketController.deleteTicket);

export default router;
