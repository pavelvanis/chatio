import { errorHandler } from "@/lib/services/apiErrorHandler";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const getAll = async (req: NextRequest) => {
  try {
    //
    // Check JWT
    //

    // Get All Users ..
    const users = await UserModel.find({});
    // ..

    // Return Users
    return NextResponse.json(users);
  } catch (error) {
    return errorHandler(error);
  }
};
