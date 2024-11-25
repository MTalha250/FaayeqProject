import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> => {
  const { id } = params;
  const { role } = await req.json();
  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(id, {
      role,
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        },
      );
    }
    const updatedUser = await User.findById(id);
    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
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
