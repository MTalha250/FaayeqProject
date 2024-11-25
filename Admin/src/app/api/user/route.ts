import User from "@/models/user";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Fundraiser from "@/models/fundraiser";
import Donation from "@/models/donation";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const users = await User.find()
      .populate({
        path: "fundraisers",
        model: Fundraiser,
      })
      .populate({
        path: "donations",
        model: Donation,
      })
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        result: users,
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
