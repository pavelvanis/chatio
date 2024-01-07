import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  console.error(error);
  if (error instanceof mongoose.Error.ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ error: error }, { status: 400 });
};
