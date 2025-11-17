import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Event schema organized by request type.
 */
export const eventSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/events
    create: {
        body: Joi.object({
            title: Joi.string().min(3).max(100).required().messages({
                "any.required": "Event title is required",
                "string.empty": "Event title cannot be empty",
            }),
            date: Joi.string().isoDate().required().messages({
                "any.required": "Event date is required",
                "string.isoDate": "Date must be in valid ISO format (YYYY-MM-DDTHH:mm:ssZ)",
            }),
            location: Joi.string().min(3).max(200).required().messages({
                "any.required": "Location is required",
                "string.empty": "Location cannot be empty",
            }),
            description: Joi.string().max(500).optional(),
        }),
    },

    // PUT /api/v1/events/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            title: Joi.string().min(3).max(100).optional(),
            date: Joi.string().isoDate().optional(),
            location: Joi.string().min(3).max(200).optional(),
            description: Joi.string().max(500).optional(),
        }),
    },
};
