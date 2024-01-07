import { errorHandler } from "@/lib/services/apiErrorHandler";
import ServerModel, { IServer } from "@/models/server";
import { NextRequest, NextResponse } from "next/server";

export const create = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IServer;
    
    // Create user ..
    const createServer = await ServerModel.create(body);
    // ..

    // Return user ..
    return NextResponse.json(createServer, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return error ..
    return errorHandler(error);
  }
};
