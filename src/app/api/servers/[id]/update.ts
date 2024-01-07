import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel, { IServer } from "@/models/server";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export const update = async (req: NextRequest, { params: { id } }: Props) => {
  try {
    const body = await req.json() as IServer;
    
    // Check if server exist ..
    const server = await ServerModel.findById(id);
    if (!server) {
      return NextResponse.json({ message: "Server not found" }, { status: 404 });
    }
    // ..

    const updatedServer = await ServerModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    // Return updated server
    return NextResponse.json(updatedServer);
  } catch (error) {
    return errorHandler(error);
  }
};
