import { errorHandler } from "@/lib/services/apiErrorHandler";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const getOne = async (req: NextRequest, { params: { id } }: Props) => {
  try {

    //
    // Check JWT
    //

    // Get All Users ..
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // ..

    // Return User
    return NextResponse.json(user);
  } catch (error) {
    // Handle Errors
    return errorHandler(error);
  }
};
