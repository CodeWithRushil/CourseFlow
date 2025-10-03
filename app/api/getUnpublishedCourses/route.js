import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const unpublishedCourses = await courseLayoutModel.find({createdBy: body.email, published: false});
    if (!unpublishedCourses) {
      return NextResponse.json(
        { success: false, message: "Unpublished Courses not found rushil" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, unpublishedCourses });
  } catch (err) {
    console.error("❌ Error in getting unpublished courses:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
