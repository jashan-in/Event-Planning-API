import { CorsOptions } from "cors";

/**
 * Returns CORS configuration options depending on environment.
 *
 * @returns {CorsOptions} Configuration options for the CORS middleware
 */
export const getCorsConfig = (): CorsOptions => {
    const isDevelopment: boolean = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        } as CorsOptions;
    }

    // Stricter configuration for production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    } as CorsOptions;
};