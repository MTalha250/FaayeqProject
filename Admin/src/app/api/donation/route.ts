import Donation from "@/models/donation";
import User from "@/models/user";
import Fundraiser from "@/models/fundraiser";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const donations = await Donation.find()
      .populate({
        path: "fundraiser",
        model: Fundraiser,
      })
      .populate({
        path: "user",
        model: User,
      })
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        result: donations,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
};
