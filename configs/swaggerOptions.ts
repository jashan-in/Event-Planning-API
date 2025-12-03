import swaggerJsdoc, { Options } from "swagger-jsdoc";

const serverUrl: string =
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Event Planning API Documentation",
            version: "1.0.0",
            description: "Swagger API documentation for the Event Planning API.",
        },
        servers: [
            {
                url: serverUrl,
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },

            schemas: {
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Operation successful" },
                        data: { type: "object" },
                    },
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Unauthorized" },
                        code: { type: "string", example: "AUTHENTICATION_ERROR" },
                        statusCode: { type: "number", example: 401 },
                    },
                },

                Event: {
                    type: "object",
                    required: ["title", "date", "location"],
                    properties: {
                        id: { type: "string", example: "event123" },
                        title: { type: "string", example: "Tech Expo" },
                        description: { type: "string", example: "Annual tech event" },
                        date: {
                            type: "string",
                            format: "date-time",
                            example: "2026-02-21T09:00:00Z",
                        },
                        location: { type: "string", example: "Winnipeg" },
                        createdAt: { type: "string", example: "2025-11-20T10:00:00Z" },
                    },
                },

                Attendee: {
                    type: "object",
                    required: ["name", "email"],
                    properties: {
                        id: { type: "string", example: "attendee456" },
                        eventId: { type: "string", example: "event123" },
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        registeredAt: {
                            type: "string",
                            example: "2025-11-20T12:00:00Z",
                        },
                    },
                },

                Ticket: {
                    type: "object",
                    required: ["eventId", "attendeeId", "type", "price", "status"],
                    properties: {
                        id: { type: "string", example: "ticket789" },
                        eventId: { type: "string", example: "event123" },
                        attendeeId: { type: "string", example: "attendee456" },
                        type: { type: "string", example: "VIP" },
                        price: { type: "number", example: 150 },
                        status: { type: "string", example: "purchased" },
                        purchasedAt: {
                            type: "string",
                            example: "2025-11-25T08:30:00Z",
                        },
                    },
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/api/v1/routes/*.ts",
        "./src/api/v1/validations/*.ts",
    ],
};

export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
