import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel from "@/models/server";
import { NextRequest, NextResponse } from "next/server";

export const getAll = async (req: NextRequest) => {
  try {

    // Get All Users ..
    const servers = await ServerModel.find({});
    // ..

    // Return Users
    return NextResponse.json(servers);
  } catch (error) {
    return errorHandler(error);
  }
};
