import { getAllEvents } from "../../services/eventService";

/**
 * Identifies events happening within the next 24 hours.
 */
export const checkUpcomingEvents = async (): Promise<void> => {
    const events = await getAllEvents();
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate > now && eventDate <= next24Hours;
    });

    if (upcomingEvents.length === 0) {
        console.log("No events in the next 24 hours.");
        return;
    }

    for (const event of upcomingEvents) {
        console.log(`Event happening soon: ${event.title} on ${event.date}`);
        // Notify users / send email / send SMS — integrate later
    }
};
