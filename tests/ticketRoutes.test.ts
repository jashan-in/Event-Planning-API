import request from "supertest";
import { Request, Response } from "express";
import app from "../src/app";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock authenticate + authorize 
jest.mock("../src/api/v1/middleware/authenticate", () =>
    jest.fn((_req, _res, next) => next())
);

jest.mock("../src/api/v1/middleware/authorize", () =>
    () => jest.fn((_req, _res, next) => next())
);

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

    // GET /api/v1/tickets
    describe("GET /api/v1/tickets", () => {
        it("should call getAllTickets controller", async () => {
            await request(app).get("/api/v1/tickets");
            expect(ticketController.getAllTickets).toHaveBeenCalled();
        });
    });

    // GET /api/v1/tickets/:id
    describe("GET /api/v1/tickets/:id", () => {
        it("should call getTicketById controller", async () => {
            await request(app).get("/api/v1/tickets/testTicketId");
            expect(ticketController.getTicketById).toHaveBeenCalled();
        });
    });

    // POST /api/v1/tickets
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

    // PUT /api/v1/tickets/:id
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

    // DELETE /api/v1/tickets/:id
    describe("DELETE /api/v1/tickets/:id", () => {
        it("should call deleteTicket controller", async () => {
            await request(app).delete("/api/v1/tickets/testTicketId");
            expect(ticketController.deleteTicket).toHaveBeenCalled();
        });
    });
});
