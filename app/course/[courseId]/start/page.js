"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { Menu, X } from "lucide-react";
import ProfileHeader from "@/components/ProfileHeader";

const StartCourse = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState({});
  const [selectedChapterContent, setSelectedChapterContent] = useState({});
  const [selectedChapter, setSelectedChapter] = useState();
  const [open, setOpen] = useState(false);

  const includeVideo = course?.includeVideo === "Yes";

  useEffect(() => {
    if (user) getCourse();
  }, [user]);

  const getCourse = async () => {
    const res = await fetch("/api/getCourseData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    const data = await res.json();
    if (data.success) setCourse(data.course);
  };

  const getSelectedChapterContent = async (index) => {
    const res = await fetch("/api/getChapterContent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.courseId,
        chapterId: index,
      }),
    });
    const data = await res.json();
    if (data.success) setSelectedChapterContent(data.chapter);
  };

  if (!course?.courseOutput) return <div className="p-4">Loading...</div>;

  return (
    <>
      {/* 🔹 Global Header */}
      <ProfileHeader />

      {/* 🔹 Course Layout */}
      <div className="relative pt-16">

        {/* 🔹 Mobile Top Bar */}
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 flex items-center gap-3 bg-blue-600 text-white p-4 shadow">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <h2 className="font-medium text-sm line-clamp-1">
            {course?.courseOutput?.courseName}
          </h2>
        </div>

        {/* 🔹 Mobile Drawer + Overlay */}
        <div
          className={`fixed inset-0 top-16 z-40 md:hidden transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {/* Overlay (Click outside closes) */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-white shadow-lg
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
              <h2 className="font-medium text-lg">Chapters</h2>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-4rem)]">
              {course?.courseOutput?.chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer hover:bg-blue-50
                  ${selectedChapter?.chapterName === chapter?.chapterName && "bg-blue-100"}`}
                  onClick={() => {
                    setSelectedChapter(chapter);
                    getSelectedChapterContent(index);
                    setOpen(false);
                  }}
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔹 Desktop Sidebar */}
        <div className="fixed hidden md:block md:w-72 top-16 h-[calc(100vh-4rem)] border-r shadow-sm bg-white">
          <h2 className="font-medium text-lg bg-blue-600 text-white p-4">
            {course?.courseOutput?.courseName}
          </h2>

          <div className="overflow-y-auto h-full">
            {course?.courseOutput?.chapters.map((chapter, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:bg-blue-50
                ${selectedChapter?.chapterName === chapter?.chapterName && "bg-blue-100"}`}
                onClick={() => {
                  setSelectedChapter(chapter);
                  getSelectedChapterContent(index);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Main Content */}
        <div className="pt-16 md:pt-0 md:ml-72 px-4 md:px-8">
          <ChapterContent
            chapter={selectedChapter}
            includeVideo={includeVideo}
            content={selectedChapterContent}
          />
        </div>
      </div>
    </>
  );
};

export default StartCourse;
