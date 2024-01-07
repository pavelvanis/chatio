import MessageModel, { IMessage } from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_BATCH_SIZE = 10;

export async function GET(res: NextRequest) {
  try {
    const { searchParams } = new URL(res.nextUrl);

    const cursor = searchParams.get("cursor");
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID is missing!", { status: 400 });
    }

    let messages: IMessage[] = [];

    if (cursor) {
      messages = await MessageModel.find({ serverId: serverId })
        .skip(1)
        .limit(MESSAGES_BATCH_SIZE)
        .sort({ createdAt: "desc" })
        .populate({
          path: "user",
        });
    } else {
      messages = await MessageModel.find({ serverId: serverId })
        .limit(MESSAGES_BATCH_SIZE)
        .sort({ createdAt: "desc" })
        .populate({
          path: "user",
        });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH_SIZE) {
      nextCursor = messages[MESSAGES_BATCH_SIZE - 1].id;
    }

    return NextResponse.json({ items: messages, nextCursor });
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}