import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as attendeeService from "../services/attendeeService";
import { Attendee } from "../models/attendeeModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all attendees for a specific event.
 *
 * @param req - Express request object containing `eventId` in params.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * @returns Promise<void>
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
 *
 * @param req - Express request containing attendee data in body and `eventId` in params.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * @returns Promise<void>
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
 * Retrieves a single attendee by attendeeId for a specific event.
 *
 * @param req - Express request containing `eventId` and `attendeeId` in params.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * @returns Promise<void>
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
 * Deletes an attendee from a specific event.
 *
 * @param req - Express request containing `eventId` and `attendeeId` in params.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 * @returns Promise<void>
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
