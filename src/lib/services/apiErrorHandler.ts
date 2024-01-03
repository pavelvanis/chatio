import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  console.error(error);
  if (error instanceof mongoose.Error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: error }, { status: 400 });
};
