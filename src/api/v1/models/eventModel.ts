/**
 * Represents an event in the Event Planning System.
 */
export interface Event {
    /** Unique Firestore document ID */
    id: string;

    /** The title or name of the event */
    title: string;

    /** The date of the event in ISO string format */
    date: string;

    /** The physical or virtual location of the event */
    location: string;

    /** Optional detailed description of the event */
    description?: string;

    /** Timestamp when the event was created */
    createdAt: Date;

    /** Timestamp when the event was last updated */
    updatedAt: Date;
}
