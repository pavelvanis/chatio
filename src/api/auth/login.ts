// import connectDB from "@/lib/db";
// import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
// import jwt, { Secret } from "jsonwebtoken";

// Interface of user
interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = (await req.json()) as NewUserRequest;

    console.log("Login", email, password);

    return NextResponse.json("logged in", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
