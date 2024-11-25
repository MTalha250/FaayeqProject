import VisitorsCount from "@/models/visitorsCount";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const visitorsCount = await VisitorsCount.findOne();
    return NextResponse.json(visitorsCount);
  } catch (err) {
    return NextResponse.json({ error: err });
  }
};
