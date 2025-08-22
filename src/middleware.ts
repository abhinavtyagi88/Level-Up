import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { aj } from "@/lib/arcjet";

// ✅ Local interface for decision
interface ArcjetDecision {
  isAllowed: () => boolean;
  action?: string;
  rule?: { name?: string };
  reason?: { type: string; message: string };
}

// ✅ Routes protected by Clerk
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/forum(.*)",
  "/api/auth(.*)",
  "/", // optional
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  // ✅ Cast decision to our interface
  const decision = (await aj.protect(req)) as unknown as ArcjetDecision;

  if (process.env.NODE_ENV === "development") {
    console.log("Arcjet decision:", {
      isAllowed: decision.isAllowed(),
      action: decision.action,
      rule: decision.rule?.name,
      reason: decision.reason,
    });
  }

  if (!decision.isAllowed()) {
    return new Response("🚫 Blocked by Arcjet", { status: 429 });
  }

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/forum/:path*",
    "/api/auth/:path*",
    "/", // remove if home should be public
    "/public/:path*",
    "/api/:path*",
    "/inngest/:path*",
  ],
};
