import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/services/auth";
import User from "@/models/user";

export async function GET(req: NextRequest, params: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        status: "error",
        message:
          "You must be signed in to view the protected content on this page.",
      },
      {
        status: 403,
      }
    );
  }

  const { id } = (session as any).user;
  console.log(id);
  try {
    const userData = await User.findById(id);
    if (!userData) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        result: userData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong",
        error: error,
      },
      { status: 500 }
    );
  }
}
