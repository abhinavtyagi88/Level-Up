// /app/api/inngest/route.ts
import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import { sendRemindersUntilResponse } from "@/app/inngest/funtions/reminders";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendRemindersUntilResponse,
  ],
});
