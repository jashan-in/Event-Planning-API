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
 * Retrieves all attendees belonging to a specific event.
 *
 * @param eventId - ID of the event whose attendees should be returned
 * @returns Promise resolving to an array of Attendee objects
 */
export const getAllAttendees = async (eventId: string): Promise<Attendee[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

    return snapshot.docs
        .filter((doc) => doc.data().eventId === eventId)
        .map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                registeredAt: data.registeredAt?.toDate
                    ? data.registeredAt.toDate()
                    : data.registeredAt,
            } as Attendee;
        });
};

/**
 * Adds a new attendee to a specific event.
 *
 * @param eventId - Event ID the attendee belongs to
 * @param attendeeData - Object containing attendee name and email
 * @returns Promise resolving to the newly created Attendee object
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

    const attendeeId: string = await createDocument(COLLECTION, newAttendee);

    return {
        id: attendeeId,
        ...newAttendee,
    } as Attendee;
};

/**
 * Retrieves a single attendee by ID and ensures they belong to the given event.
 *
 * @param eventId - Parent event ID
 * @param attendeeId - Attendee Firestore document ID
 * @returns Promise resolving to the Attendee
 * @throws Error if attendee is not found or associated with a different event
 */
export const getAttendeeById = async (
    eventId: string,
    attendeeId: string
): Promise<Attendee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, attendeeId);

    if (!doc || !doc.exists) {
        throw new Error(`Attendee with ID ${attendeeId} not found`);
    }

    const data: DocumentData = doc.data()!;

    if (data.eventId !== eventId) {
        throw new Error(`Attendee does not belong to event ID ${eventId}`);
    }

    return {
        id: doc.id,
        ...data,
    } as Attendee;
};

/**
 * Deletes an attendee by ID after verifying they belong to the given event.
 *
 * @param eventId - Event ID
 * @param attendeeId - Attendee Firestore document ID
 * @returns Promise<void>
 */
export const deleteAttendee = async (
    eventId: string,
    attendeeId: string
): Promise<void> => {
    await getAttendeeById(eventId, attendeeId);
    await deleteDocument(COLLECTION, attendeeId);
};
