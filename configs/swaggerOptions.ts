import swaggerJsdoc, { Options } from "swagger-jsdoc";

const serverUrl: string =
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Event Planning API Documentation",
            version: "1.0.0",
            description:
                "Basic API documentation for Milestone 1 of the Event Planning API.",
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
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts"], // You can add validation schemas later
};

export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};
