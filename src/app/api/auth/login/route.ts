import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    // ... Check if user exist in database

    // ... Check if password match

    // ... Create JWT token

    return NextResponse.json({ email: email, password: password });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
};
