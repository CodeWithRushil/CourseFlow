"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import Chapters from "./_components/Chapters";
import Loading from "../_components/Loading";
import { generateChapterContent } from "@/configs/AiModel";
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
    if (data.course.published) {
      redirect("/course/" + params.courseId);
    }
    if (data.success) {
      setCourse(data.course);
    }
    setLoading(false);
  };

  const generateChapterContentForCourse = async () => {
    setLoadingAnimation(true);
    const chapters = course.courseOutput.chapters;
    const chapterCount = chapters.length;
    const topic = course.courseOutput?.topic || course.name;
    const courseName = course.courseOutput?.courseName || course.name;
    const level = course.level || course.courseOutput?.level;
    const category = course.category || course.courseOutput?.category;
    const wantVideo = String(course.includeVideo || "Yes").toLowerCase() === "yes";
    const usedVideoIds = new Set();

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const chapterName = chapter.chapterName || `Chapter ${i + 1}`;
      let success = false;

      while (!success) {
        try {
          let content;
          try {
            content = await generateChapterContent({
              courseName,
              topic,
              level,
              category,
              chapterName,
              about: chapter.about,
              chapterIndex: i,
              chapterCount,
            });
          } catch (err) {
            console.warn(
              `Chapter content failed for "${chapterName}":`,
              err?.message || err
            );
            content = [
              {
                title: chapterName,
                explanation:
                  chapter.about ||
                  `Detailed notes for ${chapterName} in the course on ${topic}.`,
                code: "",
              },
            ];
          }

          console.log(`✅ Chapter ${i + 1} Content Generated`);

          let videoId = "";
          if (wantVideo) {
            try {
              videoId = await youtube.findUniqueVideo(
                `${topic}: ${chapterName}`,
                usedVideoIds
              );
              if (videoId) usedVideoIds.add(videoId);
              console.log(`✅ Video of Chapter ${i + 1} Fetched`);
            } catch (err) {
              console.warn(
                `Video search failed for "${chapterName}":`,
                err?.message || err
              );
            }
          }

          await SaveChapterInDB(chapterName, content, i, videoId);
          success = true;
        } catch (err) {
          console.error(`⚠️ Error on chapter ${i + 1}`, err);
        }
      }
    }
    try {
      const updatedCourse = { ...course, published: true };
      setCourse(updatedCourse);
      await fetch("/api/updateCourseLayout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
      });
    } catch (err) {
      // ignore publish errors; content may still be saved
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
      await fetch("/api/saveChapterContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(`✅ Saved Chapter ${i + 1} to Database`);
    } catch (err) {
      console.error(`Error Saving Chapter ${i + 1}:`, err);
    }
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
              generateChapterContent={generateChapterContentForCourse}
            />
            <CourseDetail course={course} />
            <Chapters course={course} refreshData={() => getCourseLayout()} />
          </>
        ) : (
          <p>No course data found.</p>
        )}
        <Loading
          loading={loadingAnimation}
          mode="content"
          chapterCount={course?.courseOutput?.chapters?.length || 3}
        />
      </div>
    </>
  );
};

export default CourseLayout;
