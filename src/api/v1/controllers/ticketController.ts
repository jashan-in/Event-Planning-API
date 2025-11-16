import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
import { Ticket } from "../models/ticketModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all tickets.
 */
export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tickets: Ticket[] = await ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).json(successResponse(tickets, "Tickets retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single ticket by ID.
 */
export const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const ticket: Ticket = await ticketService.getTicketById(id);
    res.status(HTTP_STATUS.OK).json(successResponse(ticket, "Ticket retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new ticket.
 */
export const createTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId, attendeeId, type, price, status } = req.body;
    const newTicket: Ticket = await ticketService.createTicket({
      eventId,
      attendeeId,
      type,
      price,
      status,
    });
    res.status(HTTP_STATUS.CREATED).json(successResponse(newTicket, "Ticket created successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing ticket by ID.
 */
export const updateTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { type, price, status } = req.body;
    const updatedTicket: Ticket = await ticketService.updateTicket(id, { type, price, status });
    res.status(HTTP_STATUS.OK).json(successResponse(updatedTicket, "Ticket updated successfully"));
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a ticket by ID.
 */
export const deleteTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await ticketService.deleteTicket(id);
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Ticket deleted successfully"));
  } catch (error) {
    next(error);
  }
};
