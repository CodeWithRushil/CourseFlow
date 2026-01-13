import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("📦 Incoming body:", body);

    const course = await courseLayoutModel.create(body);
    console.log("✅ Course saved:", course);

    return NextResponse.json({ success: true, course });
  } catch (err) {
    console.error("❌ Error saving course:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
