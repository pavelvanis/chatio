import { errorHandler } from "@/lib/services/apiErrorHandler";
import UserModel, { IUser } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const create = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as IUser;

    // Check if user already exists ..
    const userExist = await UserModel.findOne(
      { email: body.email },
      { __v: 0, password: 0 }
    );
    if (userExist) {
      return NextResponse.json(
        { message: "This email already exist" },
        { status: 400 }
      );
    }
    // ..

    // Create user ..
    const createUser = await UserModel.create(body);
    // ..

    // Return user ..
    return NextResponse.json(createUser, { status: 200 });
  } catch (error) {
    console.error(error);
    // Return error ..
    return errorHandler(error);
  }
};
