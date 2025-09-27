import { NextResponse } from "next/server";
import { connectDB } from "@/configs/db";
import courseLayoutModel from "@/models/courseLayout";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        console.log("Hello Rushil check this body: ", body);

        const course = await courseLayoutModel.findOneAndUpdate(
            { courseId: body.courseId, createdBy: body.createdBy },
            {
                $set: {
                    "courseOutput.courseName": body.courseOutput.courseName,
                    "courseOutput.chapters": body.courseOutput.chapters,
                    "courseOutput.description": body.courseOutput.description,
                    "courseBanner": body.courseBanner,
                    "published" : body.published
                }
            },
            { new: true, runValidators: true }
        );
        console.log("✅ Course updated:", course);
        return NextResponse.json({ success: true, course });
    } catch (err) {
        console.error("❌ Error in updating course:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
