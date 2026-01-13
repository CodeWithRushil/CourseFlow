"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import Chapters from "./_components/Chapters";
import Loading from "../_components/Loading";
import { generateChapterContent_AI } from "@/configs/AiModel";
import youtube from "@/configs/youtube";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import MainLoader from "@/components/MainLoader";
import { redirect } from "next/navigation";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  useEffect(() => {
    if (params?.courseId && user) {
      getCourseLayout();
    }
  }, [params, user]);

  const getCourseLayout = async () => {
    setLoading(true);
    const result = await fetch("/api/getCourseData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId,
      }),
    });
    const data = await result.json();
    if(data.course.published){
      redirect('/course/' + params.courseId);
    }
    console.log("API response:", data);
    if (data.success) {
      setCourse(data.course);
    }
    setLoading(false);
  };

  const generateChapterContent = async () => {
    setLoadingAnimation(true);
    const chapters = course.courseOutput.chapters;
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      let success = false;
      const PROMPT = `
You are a JSON API.

Your task is to generate educational content in STRICT JSON format.

RULES (MANDATORY):
- Output ONLY raw JSON
- No markdown
- No \`\`\`
- No explanations outside JSON
- No comments
- No trailing commas
- Keys must be EXACT and CASE-SENSITIVE
- Do NOT add extra keys
- Do NOT rename keys

JSON STRUCTURE (MUST MATCH EXACTLY):
{
  "content": [
    {
      "title": string,
      "explanation": string,
      "code": string
    }
  ]
}

CONTENT RULES:
- content must be an array with AT LEAST 7 objects
- explanation must be clear, beginner-friendly, and 3–5 lines
- code must be relevant to the topic (use plain text, not markdown)
- If code is not applicable, return an empty string ""

TOPIC DETAILS:
Course: ${course.name}
Chapter: ${chapter.chapterName}
`;

      while (!success) {
        try {
          const result = await generateChapterContent_AI(PROMPT);
          const chapterContent = JSON.parse(result);
          console.log(`✅ Chapter ${i + 1}:`, chapterContent);
          const rawVideo = await youtube.getVideos(
            course.name + ":" + chapter.chapterName
          );
          console.log(`✅✅ Video ${i + 1}:`, rawVideo);
          // either chapterContent or chapterContent.content based on AI response
          await SaveChapterInDB(
            chapter.chapterName,
            chapterContent.content,
            i,
            rawVideo[0].id.videoId
          );
          success = true;
        } catch (err) {
          console.error(`⚠️ Error on chapter ${i + 1}:`, err);
        }
      }
    }
    try {
      const updatedCourse = { ...course, published: true };
      setCourse(updatedCourse);
      const res = await fetch("/api/updateCourseLayout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });
      const data = await res.json();
      console.log("Updated in Database: ", data);
    } catch (err) {
      console.error("Error updating course:", err);
    }
    setLoadingAnimation(false);
    router.replace("/create-course/" + course.courseId + "/finish");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SaveChapterInDB = async (chapterInfo, chapterData, i, videoId) => {
    const payload = {
      courseId: course.courseId,
      chapterInfo: chapterInfo,
      chapterId: i,
      content: chapterData,
      videoId: videoId,
    };
    try {
      const res = await fetch("/api/saveChapterContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(`Saved Chapter ${i + 1} to Database`);
    } catch (err) {
      console.error(`Error saving chapter ${i + 1}:`, err);
    }
    // setLoading(false);
    // setLoadingComplete(true);
    // router.replace('/visit-course/' + id);
  };
  return (
    <>
      <ProfileHeader />
      <div className="mt-25 mb-20 sm:mb-25 sm:mt-30 px-7 md:px-20 lg:px-50">
        <h2 className="font-semibold text-center text-xl sm:text-2xl">
          Course Layout
        </h2>
        {loading ? (
          <div
            style={{
              position: "fixed",
              inset: 0,
              display: "grid",
              placeItems: "center",
              backgroundColor: "#ffffff",
              zIndex: 9999,
            }}
          >
            <MainLoader />
          </div>
        ) : course && course.courseOutput ? (
          <>
            <CourseBasicInfo
              course={course}
              refreshData={() => getCourseLayout()}
              generateChapterContent={generateChapterContent}
            />
            <CourseDetail course={course} />
            <Chapters course={course} refreshData={() => getCourseLayout()} />
          </>
        ) : (
          <p>No course data found.</p>
        )}
        <Loading loading={loadingAnimation} mode="content" />
      </div>
    </>
  );
};

export default CourseLayout;
