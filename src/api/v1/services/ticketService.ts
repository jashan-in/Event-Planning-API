import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

import { Ticket } from "../models/ticketModel";
import { getEventById } from "./eventService";
import { getAttendeeById } from "./attendeeService";

const COLLECTION = "tickets";

/**
 * Retrieves all tickets from Firestore.
 *
 * @returns Promise resolving to an array of Ticket objects
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

    return snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data()!;
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
        } as Ticket;
    });
};

/**
 * Retrieves a single ticket by ID.
 *
 * @param id - The Firestore document ID of the ticket
 * @returns Promise resolving to a Ticket object
 * @throws Error if the ticket is not found
 */
export const getTicketById = async (id: string): Promise<Ticket> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc || !doc.exists) {
        throw new Error(`Ticket with ID ${id} not found`);
    }

    const data: DocumentData = doc.data()!;
    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
    } as Ticket;
};

/**
 * Creates a new ticket.
 *
 * Validates:
 * - Event exists
 * - Attendee belongs to that event
 *
 * @param ticketData - Ticket creation payload
 * @returns Promise resolving to the newly created Ticket
 */
export const createTicket = async (ticketData: {
    eventId: string;
    attendeeId: string;
    type: string;
    price: number;
    status: "purchased" | "reserved" | "cancelled";
}): Promise<Ticket> => {
    // Validate event existence
    await getEventById(ticketData.eventId);

    // Validate attendee belongs to this event
    await getAttendeeById(ticketData.eventId, ticketData.attendeeId);

    const now: Date = new Date();

    const newTicket: Partial<Ticket> = {
        ...ticketData,
        createdAt: now,
        updatedAt: now,
    };

    const ticketId: string = await createDocument(COLLECTION, newTicket);

    return {
        id: ticketId,
        ...newTicket,
    } as Ticket;
};

/**
 * Updates a ticket by ID.
 *
 * @param id - Ticket document ID
 * @param data - Partial update payload for the Ticket
 * @returns Promise resolving to the updated Ticket
 */
export const updateTicket = async (
    id: string,
    data: Partial<Ticket>
): Promise<Ticket> => {
    const existing: Ticket = await getTicketById(id);

    const updated: Ticket = {
        ...existing,
        ...data,
        updatedAt: new Date(),
    };

    await updateDocument(COLLECTION, id, updated);
    return updated;
};

/**
 * Deletes a ticket by ID.
 *
 * @param id - Ticket document ID
 * @returns Promise<void>
 */
export const deleteTicket = async (id: string): Promise<void> => {
    await getTicketById(id); // ensure exists
    await deleteDocument(COLLECTION, id);
};
