import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Ticket Validation Schemas for CRUD operations
 */
export const ticketSchemas: Record<string, RequestSchema> = {

  /**
   * POST /api/v1/tickets
   * Create (purchase) a new ticket
   */
  create: {
    body: Joi.object({
      eventId: Joi.string().required().messages({
        "any.required": "eventId is required",
        "string.empty": "eventId cannot be empty",
      }),

      attendeeId: Joi.string().required().messages({
        "any.required": "attendeeId is required",
        "string.empty": "attendeeId cannot be empty",
      }),

      type: Joi.string()
        .valid("VIP", "Regular", "Student")
        .required()
        .messages({
          "any.required": "Ticket type is required",
          "any.only": "Ticket type must be VIP, Regular, or Student",
        }),

      price: Joi.number().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be greater than or equal to 0",
        "any.required": "Price is required",
      }),

      status: Joi.string()
        .valid("purchased", "reserved", "cancelled")
        .required()
        .messages({
          "any.required": "Status is required",
          "any.only":
            "Status must be one of: purchased, reserved, or cancelled",
        }),
    }),
  },

  /**
   * GET /api/v1/tickets/:id
   */
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Ticket ID is required",
        "string.empty": "Ticket ID cannot be empty",
      }),
    }),
  },

  /**
   * PUT /api/v1/tickets/:id
   * Update an existing ticket
   */
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Ticket ID is required",
        "string.empty": "Ticket ID cannot be empty",
      }),
    }),

    body: Joi.object({
      type: Joi.string()
        .valid("VIP", "Regular", "Student")
        .optional()
        .messages({
          "any.only": "Ticket type must be VIP, Regular, or Student",
        }),

      price: Joi.number().min(0).optional().messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be > 0",
      }),

      status: Joi.string()
        .valid("purchased", "reserved", "cancelled")
        .optional()
        .messages({
          "any.only":
            "Status must be one of: purchased, reserved, or cancelled",
        }),
    }),
  },

  /**
   * DELETE /api/v1/tickets/:id
   */
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Ticket ID is required",
        "string.empty": "Ticket ID cannot be empty",
      }),
    }),
  },
};
