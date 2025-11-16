import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../repositories/firestoreRepository";
import { Ticket } from "../models/ticketModel";
import { DocumentData, QuerySnapshot, DocumentSnapshot } from "firebase-admin/firestore";

const COLLECTION = "tickets";

/**
 * Retrieves all tickets from Firestore.
 * @returns {Promise<Ticket[]>} List of all tickets.
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
  try {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const tickets: Ticket[] = snapshot.docs.map((doc) => {
      const data: DocumentData = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Ticket;
    });
    return tickets;
  } catch (error: unknown) {
    throw error;
  }
};

/**
 * Retrieves a single ticket by its Firestore document ID.
 * @param id - The ticket document ID.
 * @returns {Promise<Ticket>} The retrieved ticket.
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
 * Creates a new ticket in Firestore.
 * @param ticketData - The ticket details.
 * @returns {Promise<Ticket>} The created ticket.
 */
export const createTicket = async (ticketData: {
  eventId: string;
  attendeeId: string;
  type: string;
  price: number;
  status: "purchased" | "reserved" | "cancelled";
}): Promise<Ticket> => {
  const dateNow = new Date();

  const newTicket: Partial<Ticket> = {
    ...ticketData,
    createdAt: dateNow,
    updatedAt: dateNow,
  };

  Object.keys(newTicket).forEach(
    (key) =>
      newTicket[key as keyof Ticket] === undefined &&
      delete newTicket[key as keyof Ticket]
  );

  const ticketId: string = await createDocument<Ticket>(COLLECTION, newTicket);
  return structuredClone({ id: ticketId, ...newTicket } as Ticket);
};


/**
 * Updates an existing ticket by its Firestore document ID.
 * @param id - The ticket document ID.
 * @param updates - Partial ticket updates.
 * @returns {Promise<Ticket>} The updated ticket.
 */
export const updateTicket = async (
  id: string,
  updates: Partial<Ticket>
): Promise<Ticket> => {
  const existing: Ticket = await getTicketById(id);
  if (!existing) throw new Error(`Ticket with ID ${id} not found`);

  const updated: Ticket = {
    ...existing,
    ...updates,
    updatedAt: new Date(),
  };

  await updateDocument(COLLECTION, id, updated);
  return structuredClone(updated);
};

/**
 * Deletes a ticket by its Firestore document ID.
 * @param id - The ticket document ID.
 * @returns {Promise<void>}
 */
export const deleteTicket = async (id: string): Promise<void> => {
  const existing = await getTicketById(id);
  if (!existing) throw new Error(`Ticket with ID ${id} not found`);
  await deleteDocument(COLLECTION, id);
};
