import { Request, Response, NextFunction } from "express";
import isAuthorized from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";
import { AuthorizationOptions } from "../src/api/v1/models/authorizationOptions";

describe("Authorization Middleware", () => {
    let req: Partial<Request>;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = { params: {} };
        res = {
            locals: {} as any,
        } as Response;
        next = jest.fn();
    });

    it("should throw error when no role is found", () => {
        const middleware = isAuthorized({
            hasRole: ["admin"],
        } as AuthorizationOptions);

        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthorizationError));
    });

    it("should allow access when user has required role", () => {
        const middleware = isAuthorized({
            hasRole: ["admin", "organizer"],
        } as AuthorizationOptions);

        res.locals.role = "admin";

        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it("should deny access when user role is not allowed", () => {
        const middleware = isAuthorized({
            hasRole: ["admin"],
        } as AuthorizationOptions);

        res.locals.role = "user";

        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthorizationError));
    });

    it("should allow access when allowSameUser is true and UID matches", () => {
        const middleware = isAuthorized({
            hasRole: ["admin"],
            allowSameUser: true,
        } as AuthorizationOptions);

        req.params = { id: "user123" };
        res.locals.uid = "user123";
        res.locals.role = "user";

        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it("should deny when allowSameUser is true but UID does not match", () => {
        const middleware = isAuthorized({
            hasRole: ["organizer"],
            allowSameUser: true,
        } as AuthorizationOptions);

        req.params = { id: "user123" };
        res.locals.uid = "otherUser";
        res.locals.role = "user";

        middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthorizationError));
    });
});
