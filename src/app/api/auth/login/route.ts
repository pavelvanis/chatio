import connectDB from "@/lib/mongo";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    await connectDB();

    // Check if user exist in database ..
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if password match ..
    const pwdMatch = await user.comparePassword(password);
    if(!pwdMatch) {
      return NextResponse.json({ message: "Password not match" }, { status: 401 });
    }

    // ... Create JWT token

    return NextResponse.json({ email: email, password: password });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
