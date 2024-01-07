import { errorHandler } from "@/lib/services/apiErrorHandler";
import MemberShipModel from "@/models/member-ship";
import { NextRequest, NextResponse } from "next/server";

export const getAll = async (req: NextRequest) => {
  try {

    // Get All Memberships ..
    const memberships = await MemberShipModel.find({});
    // ..

    // Return Memberships
    return NextResponse.json(memberships);
  } catch (error) {
    return errorHandler(error);
  }
};
