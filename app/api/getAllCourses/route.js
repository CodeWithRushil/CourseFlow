import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const allCourses = await courseLayoutModel.find({published: true});
    if (!allCourses) {
      return NextResponse.json(
        { success: false, message: "All Courses not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, allCourses });
  } catch (err) {
    console.error("❌ Error in getting all courses:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}