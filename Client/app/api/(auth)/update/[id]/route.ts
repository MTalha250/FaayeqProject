import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const { firstName, lastName, email, phone, role, fundraisers, donations } =
    await req.json();
  await dbConnect();
  try {
    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      role,
      fundraisers,
      donations,
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
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

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;
  const { password, newPassword } = await req.json();
  await dbConnect();
  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Your current password is incorrect",
        },
        {
          status: 400,
        }
      );
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
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
