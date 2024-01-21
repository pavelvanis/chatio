import ServerModel from "@/models/server";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const { searchParams } = new URL(req.nextUrl);

    // const user = searchParams.get("userId");
    // const inviteCode = searchParams.get("inviteCode");

    const { user, inviteCode } = await req.json();

    if (!user) {
      return NextResponse.json({ error: "User Id missing!" }, { status: 400 });
    }

    if (!inviteCode) {
      return NextResponse.json(
        { error: "Invite code missing!" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ _id: user });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 400 }
      );
    }

    const server = await ServerModel.findOne({ inviteCode: inviteCode });
    if (!server) {
      return new NextResponse("Server does not exist!", { status: 400, statusText: "Server does not exist!" });
    }

    await server.addMember(user);

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_INVITE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
