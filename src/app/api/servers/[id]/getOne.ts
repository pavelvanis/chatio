import connectDB from "@/lib/mongo";
import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel from "@/models/server";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const getOne = async (req: NextRequest, { params: { id } }: Props) => {
  try {

    await connectDB();

    //
    // Check JWT
    //

    // Get All Users ..
    const user = await ServerModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "Server not found" }, { status: 404 });
    }
    // ..

    // Return User
    return NextResponse.json(user);
  } catch (error) {
    // Handle Errors
    return errorHandler(error);
  }
};
