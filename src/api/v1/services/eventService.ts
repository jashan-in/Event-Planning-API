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

import { Event } from "../models/eventModel";

const COLLECTION = "events";

/**
 * Retrieves all events from Firestore.
 *
 * @returns Promise resolving to an array of Event objects
 */
export const getAllEvents = async (): Promise<Event[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

    return snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        } as Event;
    });
};

/**
 * Creates a new event.
 *
 * @param eventData - Input object containing event details (title, date, location, description)
 * @returns Promise resolving to the newly created Event
 */
export const createEvent = async (eventData: {
    title: string;
    date: string;
    location: string;
    description?: string;
}): Promise<Event> => {
    const now = new Date();

    const newEvent: Partial<Event> = {
        ...eventData,
        createdAt: now,
        updatedAt: now,
    };

    // Remove undefined properties
    Object.keys(newEvent).forEach((key) => {
        if (newEvent[key as keyof Event] === undefined) {
            delete newEvent[key as keyof Event];
        }
    });

    const eventId: string = await createDocument(COLLECTION, newEvent);

    return {
        id: eventId,
        ...newEvent,
    } as Event;
};

/**
 * Retrieves a single event by its Firestore document ID.
 *
 * @param id - The Firestore document ID of the event
 * @returns Promise resolving to the Event
 * @throws Error if the event is not found
 */
export const getEventById = async (id: string): Promise<Event> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc || !doc.exists) {
        throw new Error(`Event with ID ${id} not found`);
    }

    const data: DocumentData = doc.data()!;

    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
    } as Event;
};

/**
 * Updates an existing event.
 *
 * @param id - The event document ID
 * @param eventData - Partial event data to update
 * @returns Promise resolving to the updated Event
 */
export const updateEvent = async (
    id: string,
    eventData: Partial<Event>
): Promise<Event> => {
    const existingEvent = await getEventById(id);

    const updatedEvent: Event = {
        ...existingEvent,
        ...eventData,
        updatedAt: new Date(),
    };

    await updateDocument(COLLECTION, id, updatedEvent);

    return updatedEvent;
};

/**
 * Deletes an event by ID.
 *
 * @param id - The event document ID
 * @returns Promise<void>
 */
export const deleteEvent = async (id: string): Promise<void> => {
    await getEventById(id);
    await deleteDocument(COLLECTION, id);
};
