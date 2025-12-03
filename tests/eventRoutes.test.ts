import request from "supertest";
import { Request, Response } from "express";
import app from "../src/app";
import * as eventController from "../src/api/v1/controllers/eventController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

//  Mock authenticate + authorize 
jest.mock("../src/api/v1/middleware/authenticate", () =>
    jest.fn((_req, _res, next) => next())
);

jest.mock("../src/api/v1/middleware/authorize", () =>
    () => jest.fn((_req, _res, next) => next())
);

// Mock all controller methods
jest.mock("../src/api/v1/controllers/eventController", () => ({
    getAllEvents: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    createEvent: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.CREATED).send()
    ),
    getEventById: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    updateEvent: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    deleteEvent: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
}));

describe("Event Routes", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // GET /api/v1/events
    describe("GET /api/v1/events", () => {
        it("should call getAllEvents controller", async () => {
            await request(app).get("/api/v1/events");
            expect(eventController.getAllEvents).toHaveBeenCalled();
        });
    });

    // POST /api/v1/events
    describe("POST /api/v1/events", () => {
        it("should call createEvent controller with valid data", async () => {
            const mockEvent = {
                title: "Sample Event",
                description: "Testing create route",
                date: "2025-12-01T09:00:00Z",
                location: "Winnipeg Convention Centre",
            };

            await request(app)
                .post("/api/v1/events")
                .send(mockEvent);

            expect(eventController.createEvent).toHaveBeenCalled();
        });
    });

    // GET /api/v1/events/:id
    describe("GET /api/v1/events/:id", () => {
        it("should call getEventById controller", async () => {
            await request(app).get("/api/v1/events/testId");
            expect(eventController.getEventById).toHaveBeenCalled();
        });
    });

    // PUT /api/v1/events/:id
    describe("PUT /api/v1/events/:id", () => {
        it("should call updateEvent controller with valid data", async () => {
            const mockEvent = {
                title: "Updated Event",
                description: "Updated details",
                date: "2026-01-10T09:00:00Z",
                location: "Toronto Convention Centre",
            };

            await request(app)
                .put("/api/v1/events/testId")
                .send(mockEvent);

            expect(eventController.updateEvent).toHaveBeenCalled();
        });
    });

    // DELETE /api/v1/events/:id
    describe("DELETE /api/v1/events/:id", () => {
        it("should call deleteEvent controller", async () => {
            await request(app).delete("/api/v1/events/testId");
            expect(eventController.deleteEvent).toHaveBeenCalled();
        });
    });
});
