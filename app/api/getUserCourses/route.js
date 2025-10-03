import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const userCourses = await courseLayoutModel.find({createdBy: body.email, published: true});
    if (!userCourses) {
      return NextResponse.json(
        { success: false, message: "Course not found rushil" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, userCourses });
  } catch (err) {
    console.error("❌ Error in getting course:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
