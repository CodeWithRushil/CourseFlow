import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseContentModel from "@/models/courseContent";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const chapter = await courseContentModel.findOne({courseId: body.courseId, chapterId: body.chapterId});
    if (!chapter) {
      return NextResponse.json(
        { success: false, message: "chapter not found rushil check plz" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, chapter });
  } catch (err) {
    console.error("❌ Error in getting chapter:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
