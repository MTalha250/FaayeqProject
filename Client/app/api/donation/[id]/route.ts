import Donation from "@/models/donation";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Fundraiser from "@/models/fundraiser";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  await dbConnect();
  const { id } = params;
  const {
    firstName,
    lastName,
    email,
    phone,
    paymentMethod,
    paymentStatus,
    amount,
  } = await req.json();
  try {
    await Donation.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      paymentMethod,
      paymentStatus,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Fundraiser updated successfully",
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  await dbConnect();
  const { id } = params;
  try {
    await Donation.findByIdAndDelete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Donation deleted successfully",
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  await dbConnect();
  const { id } = params;
  try {
    const fundraiser = await Donation.findById(id)
      .populate({
        path: "fundraiser",
        model: Fundraiser,
      })
      .populate({
        path: "user",
        model: User,
      });
    return NextResponse.json(
      {
        success: true,
        result: fundraiser,
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
