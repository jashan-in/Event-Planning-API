/**
 * Represents a ticket purchased or reserved for an event.
 */
export interface Ticket {
  /** Unique Firestore document ID */
  id: string;

  /** Reference to the event this ticket belongs to */
  eventId: string;

  /** Reference to the attendee who owns this ticket */
  attendeeId: string;

  /** Type of the ticket (e.g., VIP, Regular, Student) */
  type: string;

  /** Price of the ticket */
  price: number;

  /** Status of the ticket (e.g., purchased, reserved, cancelled) */
  status: "purchased" | "reserved" | "cancelled";

  /** Timestamp when the ticket was created */
  createdAt: Date;

  /** Timestamp when the ticket was last updated */
  updatedAt: Date;
}
