import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Attendee schema organized by request type.
 */
export const attendeeSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/events/:id/attendees
    create: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(2).max(100).required().messages({
                "any.required": "Attendee name is required",
                "string.empty": "Name cannot be empty",
            }),
            email: Joi.string().email().required().messages({
                "any.required": "Email is required",
                "string.email": "Email must be valid",
            }),
        }),
    },

    // DELETE /api/v1/events/:id/attendees/:attendeeId
    remove: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
            attendeeId: Joi.string().required().messages({
                "any.required": "Attendee ID is required",
                "string.empty": "Attendee ID cannot be empty",
            }),
        }),
    },
};
