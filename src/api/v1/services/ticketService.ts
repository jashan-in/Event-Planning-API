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
 * Retrieves a ticket by ID.
 */
export const getTicketById = async (id: string): Promise<Ticket> => {
  const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

  if (!doc || !doc.exists) {
    throw new Error(`Ticket with ID ${id} not found`);
  }

  const data = doc.data()!;
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  } as Ticket;
};

/**
 * Create a new ticket (requires attendee + event validation).
 */
export const createTicket = async (ticketData: {
  eventId: string;
  attendeeId: string;
  type: string;
  price: number;
  status: "purchased" | "reserved" | "cancelled";
}): Promise<Ticket> => {

  // 1️⃣ Ensure event exists
  await getEventById(ticketData.eventId);

  // 2️⃣ Ensure attendee belongs to the event
  await getAttendeeById(ticketData.eventId, ticketData.attendeeId);

  const now = new Date();

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
 * Updates a ticket.
 */
export const updateTicket = async (
  id: string,
  data: Partial<Ticket>
): Promise<Ticket> => {
  const existing = await getTicketById(id);

  const updated: Ticket = {
    ...existing,
    ...data,
    updatedAt: new Date(),
  };

  await updateDocument(COLLECTION, id, updated);
  return updated;
};

/**
 * Deletes a ticket.
 */
export const deleteTicket = async (id: string): Promise<void> => {
  await getTicketById(id); // ensure exists
  await deleteDocument(COLLECTION, id);
};
