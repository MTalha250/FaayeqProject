import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> => {
  const { id } = params;
  const { role } = await req.json();
  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        role,
      },
      { new: true },
    );

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user,
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
