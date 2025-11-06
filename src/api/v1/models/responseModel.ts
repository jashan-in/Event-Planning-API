/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: { message: string; code?: string };
    timestamp?: string;
}

/**
 * Creates a standardized success response object.
 * @param data - The data to include in the response.
 * @param message - Optional message providing additional context.
 * @returns {ApiResponse<T>} The formatted success response.
 */
export const successResponse = <T>(
    data: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

/**
 * Creates a standardized error response object.
 * @param message - The error message.
 * @param code - Optional error code for debugging.
 * @returns {ApiResponse<null>} The formatted error response.
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    error: { message, code },
    timestamp: new Date().toISOString(),
});