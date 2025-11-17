import request from "supertest";
import { Request, Response } from "express";
import app from "../src/app";
import * as attendeeController from "../src/api/v1/controllers/attendeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock all attendee controller methods
jest.mock("../src/api/v1/controllers/attendeeController", () => ({
    getAllAttendees: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    addAttendee: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.CREATED).send()
    ),
    getAttendeeById: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    deleteAttendee: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
}));

describe("Attendee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockEventId = "mockEvent123";
    const mockAttendeeId = "mockAttendee456";

    // GET /api/v1/events/:id/attendees
    describe("GET /api/v1/events/:id/attendees", () => {
        it("should call getAllAttendees controller", async () => {
            await request(app).get(`/api/v1/events/${mockEventId}/attendees`);
            expect(attendeeController.getAllAttendees).toHaveBeenCalled();
        });
    });

    // POST /api/v1/events/:id/attendees
    describe("POST /api/v1/events/:id/attendees", () => {
        it("should call addAttendee controller with valid data", async () => {
            const mockAttendee = {
                name: "Jashan",
                email: "jashan@example.com",
            };

            await request(app)
                .post(`/api/v1/events/${mockEventId}/attendees`)
                .send(mockAttendee);

            expect(attendeeController.addAttendee).toHaveBeenCalled();
        });
    });

    // GET /api/v1/events/:id/attendees/:attendeeId
    describe("GET /api/v1/events/:id/attendees/:attendeeId", () => {
        it("should call getAttendeeById controller", async () => {
            await request(app).get(
                `/api/v1/events/${mockEventId}/attendees/${mockAttendeeId}`
            );
            expect(attendeeController.getAttendeeById).toHaveBeenCalled();
        });
    });

    // DELETE /api/v1/events/:id/attendees/:attendeeId
    describe("DELETE /api/v1/events/:id/attendees/:attendeeId", () => {
        it("should call deleteAttendee controller", async () => {
            await request(app).delete(
                `/api/v1/events/${mockEventId}/attendees/${mockAttendeeId}`
            );
            expect(attendeeController.deleteAttendee).toHaveBeenCalled();
        });
    });
});
