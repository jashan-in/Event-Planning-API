import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as attendeeService from "../services/attendeeService";
import { Attendee } from "../models/attendeeModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all attendees for a specific event.
 */
export const getAllAttendees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id: eventId } = req.params;
        const attendees: Attendee[] = await attendeeService.getAllAttendees(eventId);

        res.status(HTTP_STATUS.OK).json(
            successResponse(attendees, "Attendees retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Adds a new attendee to a specific event.
 */
export const addAttendee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id: eventId } = req.params;
        const { name, email } = req.body;

        const newAttendee: Attendee = await attendeeService.addAttendee(eventId, {
            name,
            email,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newAttendee, "Attendee added successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a single attendee by ID for a specific event.
 */
export const getAttendeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id: eventId, attendeeId } = req.params;
        const attendee: Attendee = await attendeeService.getAttendeeById(eventId, attendeeId);

        res.status(HTTP_STATUS.OK).json(
            successResponse(attendee, "Attendee retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes an attendee by ID for a specific event.
 */
export const deleteAttendee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id: eventId, attendeeId } = req.params;
        await attendeeService.deleteAttendee(eventId, attendeeId);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, "Attendee deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};
