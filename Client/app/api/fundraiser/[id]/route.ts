import Fundraiser from "@/models/fundraiser";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import Donation from "@/models/donation";

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
    title,
    description,
    category,
    image,
    totalAmount,
    status,
  } = await req.json();
  try {
    await Fundraiser.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      title,
      description,
      category,
      image,
      totalAmount,
      status,
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
    await Fundraiser.findByIdAndDelete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Fundraiser deleted successfully",
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
    const fundraiser = await Fundraiser.findById(id)
      .populate({
        path: "user",
        model: User,
      })
      .populate({
        path: "donations",
        model: Donation,
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
