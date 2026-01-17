import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { type NextRequest, NextResponse } from "next/server";

import {
  handleUserCreated,
  handleUserDeleted,
  handleUserUpdated,
} from "@/modules/users/server/webhook";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === "user.created") {
      try {
        await handleUserCreated(event.data);
        return NextResponse.json({ message: "User created" });
      } catch (error) {
        return NextResponse.json(
          { error: "Error handling user created event" },
          { status: 500 }
        );
      }
    }

    if (event.type === "user.updated") {
      try {
        await handleUserUpdated(event.data);
        return NextResponse.json({ message: "User updated" });
      } catch (error) {
        return NextResponse.json(
          { error: "Error handling user updated event" },
          { status: 500 }
        );
      }
    }

    if (event.type === "user.deleted") {
      try {
        await handleUserDeleted(event.data);
        return NextResponse.json({ message: "User deleted" });
      } catch (error) {
        return NextResponse.json(
          { error: "Error handling user deleted event" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Event ignored" });
  } catch {
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }
}
