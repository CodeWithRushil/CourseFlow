import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const userCourse = await courseLayoutModel.findOneAndDelete({courseId: body.courseId});
    if (!userCourse) {
      return NextResponse.json(
        { success: false, message: "Course not deleted rushil" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, userCourse });
  } catch (err) {
    console.error("❌ Error in deleting course:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}