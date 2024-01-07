import { errorHandler } from "@/lib/services/apiErrorHandler";
import MemberShipModel from "@/models/member-ship";
import { NextRequest, NextResponse } from "next/server";

export const deleteOne = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.nextUrl);

    const user = searchParams.get("userId");
    const server = searchParams.get("serverId");

    if (!server) {
      return new NextResponse("Server ID is missing!", { status: 400 });
    }

    if (!user) {
      return new NextResponse("User ID is missing!", { status: 400 });
    }

    const deletedMembership = await MemberShipModel.findOneAndDelete({
      user,
      server,
    });

    // Return user ..
    return NextResponse.json(deletedMembership);
  } catch (error) {
    console.error(error);
    // Return error ..
    return errorHandler(error);
  }
};
