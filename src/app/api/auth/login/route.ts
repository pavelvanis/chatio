import UserModel from "@/models/user";
import jwt, { Secret } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    // Check if user exist in database ..
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if password match ..
    const pwdMatch = await user.comparePassword(password);
    if (!pwdMatch) {
      return NextResponse.json(
        { message: "Password not match" },
        { status: 401 }
      );
    }

    // Generate JWT
    const secretKey = process.env.NEXTAUTH_SECRET as Secret;
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "6h",
    });

    return NextResponse.json({ user, token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
