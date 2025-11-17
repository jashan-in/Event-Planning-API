import request from "supertest";
import { Request, Response } from "express";
import app from "../src/app";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock ticket controller functions
jest.mock("../src/api/v1/controllers/ticketController", () => ({
    getAllTickets: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    getTicketById: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    createTicket: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.CREATED).send()
    ),
    updateTicket: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    deleteTicket: jest.fn((_req: Request, res: Response) =>
        res.status(HTTP_STATUS.OK).send()
    ),
}));

describe("Ticket Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/tickets", () => {
        it("should call getAllTickets controller", async () => {
            await request(app).get("/api/v1/tickets");
            expect(ticketController.getAllTickets).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tickets/:id", () => {
        it("should call getTicketById controller", async () => {
            await request(app).get("/api/v1/tickets/testTicketId");
            expect(ticketController.getTicketById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/tickets", () => {
        it("should call createTicket controller", async () => {
            const mockTicket = {
                eventId: "event123",
                attendeeId: "attendee456",
                type: "VIP",
                price: 100,
                status: "purchased",
            };

            await request(app)
                .post("/api/v1/tickets")
                .send(mockTicket);

            expect(ticketController.createTicket).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/tickets/:id", () => {
        it("should call updateTicket controller", async () => {
            const mockUpdates = {
                status: "cancelled",
                type: "Regular",
            };

            await request(app)
                .put("/api/v1/tickets/testTicketId")
                .send(mockUpdates);

            expect(ticketController.updateTicket).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/tickets/:id", () => {
        it("should call deleteTicket controller", async () => {
            await request(app).delete("/api/v1/tickets/testTicketId");
            expect(ticketController.deleteTicket).toHaveBeenCalled();
        });
    });
});
