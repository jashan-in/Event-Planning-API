/**
 * Represents an attendee registered for a specific event in the Event Planning System.
 */
export interface Attendee {
    /** Unique Firestore document ID */
    id: string;

    /** Reference to the parent event's ID */
    eventId: string;

    /** Full name of the attendee */
    name: string;

    /** Email address of the attendee */
    email: string;

    /** Timestamp when the attendee registered for the event */
    registeredAt: Date;
}
