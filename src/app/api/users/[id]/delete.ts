import { errorHandler } from "@/lib/services/apiErrorHandler";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const deleteOne = async (
  req: NextRequest,
  { params: { id } }: Props
) => {
  try {

    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(deleted);
  } catch (error) {
    return errorHandler(error);
  }
};
