// /inngest/functions/reminders.ts
import { inngest } from "../client";

async function hasUserResponded(userId: string): Promise<boolean> {
  // Replace with real DB check or API lookup
  return false;
}

export const sendRemindersUntilResponse = inngest.createFunction(
  { id: "send-reminders-until-response" },
  { event: "user/action.required" },
  async ({ event, step }: { event: any; step: any }) => {
    let responded = false;
    let attempt = 0;

    while (!responded && attempt < 100) { // 12 attempts = 1 hour max
      attempt++;

      // Send the alert (email, SMS, push, etc.)
      await step.run(`send-alert-${attempt}`, async () => {
        console.log(`📢 Sending alert #${attempt} to ${event.data.email}`);
        // Call your email/SMS provider here
      });

      // Sleep for 5 minutes
      await step.sleep(`wait-3s-${attempt}`, "3s");
    //   console.log(`⏳ Waiting 3 seconds before next attempt`);

      
      // Check if the user has responded
      responded = await step.run(`check-response-${attempt}`, async () => {
        console.log(`🔍 Checking if user ${event.data.userId} has responded`);

         console.log('responded', responded);
        return await hasUserResponded(event.data.userId);
      });
    }


  }
);
