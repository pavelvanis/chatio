import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel from "@/models/server";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const getOne = async (req: NextRequest, { params: { id } }: Props) => {
  try {
    
    // Get All Users ..
    const server = await ServerModel.findById(id);
    if (!server) {
      return NextResponse.json(
        { message: "Server not found" },
        { status: 404 }
      );
    }
    // ..

    // Return User
    return NextResponse.json(server);
  } catch (error) {
    // Handle Errors
    return errorHandler(error);
  }
};
