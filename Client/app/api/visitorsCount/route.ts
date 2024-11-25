import VisitorsCount from "@/models/visitorsCount";
import dbConnect from "@/lib/database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const count = await VisitorsCount.findOne();
    count.count += 1;
    await count.save();
    return NextResponse.json({ message: "Visitors count updated" });
  } catch (err) {
    return NextResponse.json({ message: "Error updating visitors count" });
  }
};
