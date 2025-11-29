import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";
import { auth } from "../../../../configs/firebaseConfig";

/**
 * Middleware to authenticate a user using Firebase ID token.
 */
const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        const token: string | undefined = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : undefined;

        if (!token) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }

        const decoded: DecodedIdToken = await auth.verifyIdToken(token);

        // Store user info globally in locals (same as instructor)
        res.locals.uid = decoded.uid;
        res.locals.role = decoded.role;

        next();
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            next(error);
        } else if (error instanceof Error) {
            next(
                new AuthenticationError(
                    `Unauthorized: ${getErrorMessage(error)}`,
                    getErrorCode(error)
                )
            );
        } else {
            next(
                new AuthenticationError(
                    "Unauthorized: Invalid token",
                    "TOKEN_INVALID"
                )
            );
        }
    }
};

export default authenticate;
