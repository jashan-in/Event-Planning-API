import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";
import { Event } from "../models/eventModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all events.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware
 * @returns Promise<void>
 */
export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await eventService.getAllEvents();

        res.status(HTTP_STATUS.OK).json(
            successResponse(events, "Events retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a single event by its ID.
 *
 * @param req - Express request containing `id` in params
 * @param res - Express response object
 * @param next - Express next middleware
 * @returns Promise<void>
 */
export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const event: Event = await eventService.getEventById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Event retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new event.
 *
 * @param req - Express request containing event data in body
 * @param res - Express response object
 * @param next - Express next middleware
 * @returns Promise<void>
 */
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, date, location, description } = req.body;

        const newEvent: Event = await eventService.createEvent({
            title,
            date,
            location,
            description,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEvent, "Event created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates an existing event by its ID.
 *
 * @param req - Express request containing `id` in params and updated fields in body
 * @param res - Express response object
 * @param next - Express next middleware
 * @returns Promise<void>
 */
export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, date, location, description } = req.body;

        const updatedEvent: Event = await eventService.updateEvent(id, {
            title,
            date,
            location,
            description,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEvent, "Event updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes an event by its ID.
 *
 * @param req - Express request containing `id` in params
 * @param res - Express response object
 * @param next - Express next middleware
 * @returns Promise<void>
 */
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        await eventService.deleteEvent(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, "Event deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};
