import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/express";
import { AuthorizationError } from "../errors/errors";

/**
 * Authorization middleware to control access based on user roles.
 */
const authorize = (options: AuthorizationOptions): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role, uid } = res.locals;
            const { id } = req.params;

            if (options.allowSameUser && id && uid === id) {
                return next();
            }

            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }

            if (options.hasRole.includes(role)) {
                return next();
            }

            throw new AuthorizationError(
                "Forbidden: Insufficient permissions",
                "INSUFFICIENT_ROLE"
            );
        } catch (error) {
            next(error);
        }
    };
};

export default authorize;
