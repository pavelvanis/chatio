import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel from "@/models/server";
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

    const deleted = await ServerModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Server not found" }, { status: 404 });
    }

    return NextResponse.json(deleted);
  } catch (error) {
    return errorHandler(error);
  }
};
