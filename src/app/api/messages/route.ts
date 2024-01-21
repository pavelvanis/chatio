import MessageModel from "@/models/message";
import ServerModel from "@/models/server";
import UserModel from "@/models/user";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(re: NextRequest) {
  try {
    const { searchParams } = new URL(re.nextUrl);

    const user = searchParams.get("user");
    const server = searchParams.get("server");
    const contains = searchParams.get("contains");

    // Check user
    if(user && !isValidObjectId(user)) {
        return new NextResponse("User is not valid ID!", { status: 404 });
    }
    if(user && !(await UserModel.exists({ _id: user }))) {
        return new NextResponse("User not found!", { status: 404 });
    }

    // Check server
    if(server && !isValidObjectId(server)) {
        return new NextResponse("Server is not valid ID!", { status: 404 });
    }
    if(server && !(await ServerModel.exists({ _id: server }))) {
        return new NextResponse("Server not found!", { status: 404 });
    }

    // Get messages by user
    if (user && !server) {
      const messages = await MessageModel.find({ userId: user });
      return NextResponse.json({ items: messages });
    }

    // Get messages by server
    if (server && !user) {
      const messages = await MessageModel.find({ serverId: server });
      return NextResponse.json({ items: messages });
    }

    // Get messages containing text
    if(contains) {
        const messages = await MessageModel.find({ content: { $regex: contains, $options: 'i' } });
        return NextResponse.json({ items: messages });
    }

    // Get all messages
    const messages = await MessageModel.find({});
    return NextResponse.json({ items: messages });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
