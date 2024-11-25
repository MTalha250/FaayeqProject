import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Fundraiser from "@/models/fundraiser";
import User from "@/models/user";
import Donation from "@/models/donation";

export async function GET(
  request: NextRequest,
  { params }: { params: { query: string } }
) {
  await dbConnect();
  try {
    const { query } = params;
    const fundraisers = await Fundraiser.find({
      status: { $in: ["Active", "Completed"] },
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
      ],
    })
      .populate({
        path: "user",
        model: User,
      })
      .populate({
        path: "donations",
        model: Donation,
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      message: "Fundraisers fetched successfully",
      result: fundraisers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}
