import { HelmetOptions } from "helmet";

/**
 * Returns Helmet configuration options for different environments
 *
 * @returns {HelmetOptions} Configuration options for Helmet middleware
 */
export const getHelmetConfig = (): HelmetOptions => {
    const isDevelopment: boolean = process.env.NODE_ENV === "development";

    const baseConfig: HelmetOptions = {
        // Disable CSP for API responses (useful for JSON endpoints)
        contentSecurityPolicy: false,
        // Prevent browsers from MIME-sniffing
        noSniff: true,
    };

    if (isDevelopment) {
        // Relaxed rules for local development
        return {
            ...baseConfig,
            // Disable HTTPS enforcement locally
            hsts: false,
        } as HelmetOptions;
    }

    // Stricter rules for production
    return {
        ...baseConfig,
        hsts: {
            // One year in seconds
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    } as HelmetOptions;
};