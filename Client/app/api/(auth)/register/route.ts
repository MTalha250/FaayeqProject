import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, password, phone } = await request.json();
  await dbConnect();
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
    });
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user,
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
}

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        result: users,
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
}
