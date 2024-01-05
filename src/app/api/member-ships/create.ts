import connectDB from "@/lib/mongo";
import { errorHandler } from "@/lib/services/apiErrorHandler";
import MemberShipModel, { IMembership } from "@/models/member-ship";
import { NextRequest, NextResponse } from "next/server";

export const create = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IMembership;

    //
    // ... Check JWT
    //

    await connectDB();

    // Create user ..
    const createUser = await MemberShipModel.create(body);
    // ..

    // Return user ..
    return NextResponse.json(createUser, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return error ..
    return errorHandler(error);
  }
};