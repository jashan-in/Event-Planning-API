import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    deleteDocument,
} from "../repositories/firestoreRepository";
import { Attendee } from "../models/attendeeModel";

const COLLECTION: string = "attendees";

/**
 * Retrieves all attendees for a specific event from Firestore.
 * @param eventId - The ID of the event.
 * @returns {Promise<Attendee[]>} List of attendees for the event.
 */
export const getAllAttendees = async (eventId: string): Promise<Attendee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const attendees: Attendee[] = snapshot.docs
            .filter((doc) => doc.data().eventId === eventId)
            .map((doc) => {
                const data: DocumentData = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    registeredAt: data.registeredAt?.toDate?.() || data.registeredAt,
                } as Attendee;
            });
        return attendees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Adds a new attendee to a specific event in Firestore.
 * @param eventId - The ID of the event.
 * @param attendeeData - The attendee's details.
 * @returns {Promise<Attendee>} The created attendee record.
 */
export const addAttendee = async (
    eventId: string,
    attendeeData: { name: string; email: string }
): Promise<Attendee> => {
    const newAttendee: Partial<Attendee> = {
        ...attendeeData,
        eventId,
        registeredAt: new Date(),
    };

    const attendeeId: string = await createDocument<Attendee>(COLLECTION, newAttendee);
    return structuredClone({ id: attendeeId, ...newAttendee } as Attendee);
};

/**
 * Retrieves a single attendee by their Firestore document ID for a specific event.
 * @param eventId - The ID of the parent event.
 * @param attendeeId - The attendee's Firestore document ID.
 * @returns {Promise<Attendee>} The retrieved attendee.
 * @throws {Error} If the attendee is not found or not part of the event.
 */
export const getAttendeeById = async (
    eventId: string,
    attendeeId: string
): Promise<Attendee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, attendeeId);

    if (!doc || !doc.exists) {
        throw new Error(`Attendee with ID ${attendeeId} not found`);
    }

    const data: DocumentData | undefined = doc.data();

    if (data?.eventId !== eventId) {
        throw new Error(`Attendee does not belong to event ID ${eventId}`);
    }

    return structuredClone({ id: doc.id, ...data } as Attendee);
};

/**
 * Deletes an attendee by ID from Firestore for a specific event.
 * @param eventId - The event ID the attendee belongs to.
 * @param attendeeId - The attendee document ID.
 * @returns {Promise<void>}
 */
export const deleteAttendee = async (
    eventId: string,
    attendeeId: string
): Promise<void> => {
    const attendee: Attendee = await getAttendeeById(eventId, attendeeId);
    if (!attendee) {
        throw new Error(`Attendee with ID ${attendeeId} not found`);
    }

    await deleteDocument(COLLECTION, attendeeId);
};
