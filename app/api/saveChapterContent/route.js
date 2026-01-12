import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseContentModel from "@/models/courseContent";

export async function POST(req) {
  const MAX_RETRIES = 5;
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const chapter = await courseContentModel.create(body);

      return NextResponse.json({ success: true, chapter });
    } catch (err) {
      console.error(`❌ Attempt ${attempt} failed:`, err);

      if (attempt === MAX_RETRIES) {
        return NextResponse.json(
          { success: false, error: "Failed after retries" },
          { status: 500 }
        );
      }
    }
  }
}
