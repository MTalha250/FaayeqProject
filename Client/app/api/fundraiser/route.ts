import Fundraiser from "@/models/fundraiser";
import User from "@/models/user";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Donation from "@/models/donation";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  const {
    firstName,
    lastName,
    email,
    phone,
    title,
    description,
    category,
    image,
    totalAmount,
    user,
  } = await req.json();
  try {
    const fundraiser = await Fundraiser.create({
      firstName,
      lastName,
      email,
      phone,
      title,
      description,
      category,
      image,
      totalAmount,
      user,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        $push: { fundraisers: fundraiser._id },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Fundraiser created successfully",
        fundraiser: {
          ...fundraiser._doc,
          user: updatedUser,
        },
      },
      {
        status: 200,
      }
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
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const fundraisers = await Fundraiser.find({
      status: { $in: ["Active", "Completed"] },
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
    return NextResponse.json(
      {
        success: true,
        result: fundraisers,
      },
      {
        status: 200,
      }
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
      }
    );
  }
};
