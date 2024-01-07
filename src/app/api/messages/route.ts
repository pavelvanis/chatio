import MessageModel, { IMessage } from "@/models/message";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";

const MESSAGES_BATCH_SIZE = 15;

export async function GET(res: NextRequest) {
  try {
    const { searchParams } = new URL(res.nextUrl);

    const cursor = searchParams.get("cursor");
    const serverId = searchParams.get("serverId");

    console.log(cursor);
    console.log("SERCH PARAMS", searchParams);

    if (!serverId) {
      return new NextResponse("Server ID is missing!", { status: 400 });
    }

    let messages: any[] = [];

    if (cursor) {
      messages = await MessageModel.find({
        serverId: serverId,
        _id: { $lt: cursor },
      })
        .limit(MESSAGES_BATCH_SIZE)
        .sort({ timestamp: "desc" })
        .populate({
          path: "userId",
        });
    } else {
      messages = await MessageModel.find({ serverId: serverId })
        .limit(MESSAGES_BATCH_SIZE)
        .sort({ timestamp: "desc" })
        .populate("userId");
    }

    let nextCursor = null;

    console.log("LENGTH", messages.length);
    messages.forEach((element) => {
      console.log(element.content);
    });

    if (messages.length === MESSAGES_BATCH_SIZE) {
      nextCursor = messages[MESSAGES_BATCH_SIZE - 1].id;
    }

    console.log("CURSOR", nextCursor);

    return NextResponse.json({ items: messages, nextCursor });
  } catch (error) {
    console.error("[MESSAGES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
