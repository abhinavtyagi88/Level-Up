// Example: /app/actions.ts
"use server";

import { inngest } from "@/app/inngest/client";

export async function requestUserAction(userId: string, email: string) {
  await inngest.send({
    name: "user/action.required",
    data: {
      userId,
      email,
    },
  });
}
