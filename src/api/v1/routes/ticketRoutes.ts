import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController";
import { validateRequest } from "../middleware/validate";

const router: Router = express.Router();

router.get("/", ticketController.getAllTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", ticketController.createTicket);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

export default router;