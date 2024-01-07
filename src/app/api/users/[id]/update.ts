import { errorHandler } from "@/lib/services/apiErrorHandler";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const update = async (req: NextRequest, { params: { id } }: Props) => {
  try {
    const body = await req.json();

    // Get All Users ..
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // ..

    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // Return Users
    return NextResponse.json(updatedUser);
  } catch (error) {
    return errorHandler(error);
  }
};
