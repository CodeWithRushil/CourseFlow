import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseContentModel from "@/models/courseContent";

export async function POST(req) {
  try {
    await connectDB(); // ensure DB connected

    const body = await req.json();
    console.log("📦 Incoming chapter body:", body); // 👈 log incoming data

    const chapter = await courseContentModel.create(body);
    console.log("✅ Chapter saved:", chapter);

    return NextResponse.json({ success: true, chapter });
  } catch (err) {
    console.error("❌ Error saving chapter:", err); // 👈 full error on server
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
