import { errorHandler } from "@/lib/services/apiErrorHandler";
import MemberShipModel from "@/models/member-ship";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};


export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  try {

    const memberShips = await MemberShipModel.find({server: id}).populate("user")

    const members = memberShips.map((memberShip) => memberShip.user);

    return NextResponse.json(members);
  } catch (error) {
    // Handle Errors
    return errorHandler(error);
  }
};
