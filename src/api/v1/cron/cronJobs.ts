import cron from "node-cron";
import { checkUpcomingEvents } from "./tasks/checkUpcomingEvents";

// Runs every day at midnight
// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running upcoming event check...");
    await checkUpcomingEvents();
});


