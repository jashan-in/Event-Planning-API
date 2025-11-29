import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../configs/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

jest.mock("../configs/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("Authentication Middleware", () => {
    let req: Partial<Request>;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = { headers: {} };

        res = {
            locals: {} as any,
        } as Response;

        next = jest.fn();
    });

    it("should throw an error when no Authorization header", async () => {
        await authenticate(req as Request, res as Response, next);
        expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
    });

    it("should throw error when token is invalid", async () => {
        req.headers = { authorization: "Bearer invalidtoken" };

        (auth.verifyIdToken as jest.Mock).mockRejectedValue(
            new Error("Invalid token")
        );

        await authenticate(req as Request, res as Response, next);
        expect(next).toHaveBeenCalledWith(expect.any(AuthenticationError));
    });

    it("should authenticate successfully with a valid token", async () => {
        req.headers = { authorization: "Bearer validtoken" };

        (auth.verifyIdToken as jest.Mock).mockResolvedValue({
            uid: "mockUid123",
            role: "admin",
        });

        await authenticate(req as Request, res as Response, next);

        expect(res.locals.uid).toBe("mockUid123");
        expect(res.locals.role).toBe("admin");
        expect(next).toHaveBeenCalled();
    });
});
