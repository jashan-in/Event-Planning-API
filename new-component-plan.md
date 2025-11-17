## Integration of new component.
### Node-Cron
For my new component, I will integrate Node-Cron to run background jobs in my API. I will create a separate file called scheduler.ts inside a utils folder. This file will contain a cron job that runs every hour. It will use my existing Event Service (getAllEvents()) to fetch events and check if any event is happening within the next 24 hours. If yes, it will log reminder messages.

The scheduler will be initialized in server.ts so when the server starts, the cron jobs start automatically. My routes will not trigger the cron logic, it will runs independently in the background.

### How This Component Enhances the Project
It will add automation and will make my project API smart.
Every event system needs reminders,this will bring real world functionality into the project.
