import Fundraiser from "@/models/fundraiser";
import User from "@/models/user";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Donation from "@/models/donation";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const fundraisers = await Fundraiser.find()
      .populate({
        path: "user",
        model: User,
      })
      .populate({
        path: "donations",
        model: Donation,
      })
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        result: fundraisers,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
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
