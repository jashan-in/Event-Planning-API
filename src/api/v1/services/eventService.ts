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

const COLLECTION: string = "events";

/**
 * Retrieves all events from Firestore.
 * @returns {Promise<Event[]>} List of all events.
 */
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const events: Event[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
            } as Event;
        });
        return events;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new event in Firestore.
 * @param eventData - The event details.
 * @returns {Promise<Event>} The created event.
 */
export const createEvent = async (eventData: {
    title: string;
    date: string;
    location: string;
    description?: string;
}): Promise<Event> => {
    const dateNow = new Date();

    const newEvent: Partial<Event> = {
        ...eventData,
        createdAt: dateNow,
        updatedAt: dateNow,
    };

    // Remove undefined values 
    Object.keys(newEvent).forEach(
        (key) =>
            newEvent[key as keyof Event] === undefined &&
            delete newEvent[key as keyof Event]
    );

    const eventId: string = await createDocument<Event>(COLLECTION, newEvent);
    return structuredClone({ id: eventId, ...newEvent } as Event);
};

/**
 * Retrieves a single event by its Firestore document ID.
 * @param id - The event document ID.
 * @returns {Promise<Event>} The retrieved event.
 * @throws {Error} If the event is not found.
 */
export const getEventById = async (id: string): Promise<Event> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc || !doc.exists) {
        throw new Error(`Event with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    return structuredClone({ id: doc.id, ...data } as Event);
};

/**
 * Updates an existing event in Firestore.
 * @param id - The event document ID.
 * @param eventData - The updated event data.
 * @returns {Promise<Event>} The updated event.
 */
export const updateEvent = async (
    id: string,
    eventData: Partial<Event>
): Promise<Event> => {
    const existingEvent: Event = await getEventById(id);
    if (!existingEvent) {
        throw new Error(`Event with ID ${id} not found`);
    }

    const updatedEvent: Event = {
        ...existingEvent,
        ...eventData,
        updatedAt: new Date(),
    };

    await updateDocument<Event>(COLLECTION, id, updatedEvent);
    return structuredClone(updatedEvent);
};

/**
 * Deletes an event by its Firestore document ID.
 * @param id - The event document ID.
 * @returns {Promise<void>}
 */
export const deleteEvent = async (id: string): Promise<void> => {
    const event: Event = await getEventById(id);
    if (!event) {
        throw new Error(`Event with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};
