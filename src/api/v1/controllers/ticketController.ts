import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";
import { Ticket } from "../models/ticketModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all tickets.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Promise<void>
 */
export const getAllTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tickets: Ticket[] = await ticketService.getAllTickets();

        res.status(HTTP_STATUS.OK).json(
            successResponse(tickets, "Tickets retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a single ticket by ID.
 *
 * @param req - Express request object containing ticket ID
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Promise<void>
 */
export const getTicketById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const ticket: Ticket = await ticketService.getTicketById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(ticket, "Ticket retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new ticket.
 *
 * @param req - Express request object containing ticket data in body
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Promise<void>
 */
export const createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newTicket: Ticket = await ticketService.createTicket(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newTicket, "Ticket created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates a ticket by ID.
 *
 * @param req - Express request object containing ticket ID and updated fields
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Promise<void>
 */
export const updateTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedTicket: Ticket = await ticketService.updateTicket(id, req.body);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedTicket, "Ticket updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes a ticket by ID.
 *
 * @param req - Express request object containing ticket ID
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns Promise<void>
 */
export const deleteTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await ticketService.deleteTicket(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, "Ticket deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};
