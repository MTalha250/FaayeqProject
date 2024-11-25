import Donation from "@/models/donation";
import User from "@/models/user";
import Fundraiser from "@/models/fundraiser";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  const {
    firstName,
    lastName,
    email,
    phone,
    paymentMethod,
    amount,
    fundraiser,
    user,
  } = await req.json();
  try {
    const donation = await Donation.create({
      firstName,
      lastName,
      email,
      phone,
      paymentMethod,
      amount,
      fundraiser,
      user,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        $push: { donations: donation._id },
      },
      { new: true }
    );

    let updatedFundraiser = await Fundraiser.findByIdAndUpdate(
      fundraiser,
      {
        $push: { donations: donation._id },
        $inc: { amountRaised: amount },
      },
      { new: true }
    );

    if (updatedFundraiser.amountRaised >= updatedFundraiser.totalAmount) {
      updatedFundraiser = await Fundraiser.findByIdAndUpdate(
        fundraiser,
        {
          status: "Completed",
        },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Donation created successfully",
        donation: {
          ...donation._doc,
          user: updatedUser,
          fundraiser: updatedFundraiser,
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
    const fundraisers = await Donation.find()
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
        result: fundraisers,
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
