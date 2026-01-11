"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import MainLoader from "@/components/MainLoader";

const StartCourse = ({ params }) => {
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState({});
  const [selectedChapterContent, setSelectedChapterContent] = useState({});
  const [selectedChapter, setSelectedChapter] = useState();
  const [open, setOpen] = useState(false);

  const includeVideo = course?.includeVideo === "Yes";

  useEffect(() => {
    if (user) getCourse();
  }, [user]);

  useEffect(() => {
    if (selectedChapter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedChapter]);

  const getCourse = async () => {
    const res = await fetch("/api/getCourseData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId
      }),
    });
    const data = await res.json();
    if (data.success) {
      setCourse(data.course);
      const firstChapter = data.course?.courseOutput?.chapters?.[0];
      if (firstChapter) {
        setSelectedChapter(firstChapter);
        getSelectedChapterContent(data.course.courseId, 0);
      }
    }
  };

  const getSelectedChapterContent = async (courseId, index) => {
    const res = await fetch("/api/getChapterContent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        chapterId: index,
      }),
    });
    const data = await res.json();
    if (data.success) setSelectedChapterContent(data.chapter);
  };

  if (!course?.courseOutput)
    return (
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
    );

  return (
    <>
      {/* 🔹 NEW NAVBAR (Replacing ProfileHeader) */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* LEFT: Toggle + Logo */}
            <div className="flex items-center gap-2 pl-0 sm:pl-2">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
              >
                {open ? <HiX size={22} /> : <HiMenuAlt2 size={22} />}
              </button>

              <Link href="/dashboard" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                <span className="text-2xl font-semibold text-[#02060d]  xs:block">
                  Course<span className="italic">Flow</span>
                </span>
              </Link>
            </div>

            {/* RIGHT: Profile */}
            <div className="flex items-center">
              {isLoaded ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 OVERLAY (Mobile Only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
        />
      )}

      {/* 🔹 Course Layout */}
      <div className="relative pt-16">
        {/* 🔹 MOBILE DRAWER */}
        <div
          className={`fixed left-0 top-0 z-40 h-screen w-80 bg-white
    border-r border-gray-200 pt-16
    transform transition-transform duration-300 md:hidden
    ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-lg text-slate-800 tracking-tight leading-tight">
              {course?.courseOutput?.courseName}
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Course Content
            </p>
          </div>

          {/* Chapters */}
          <div className="flex-1 overflow-y-auto py-4">
            {course?.courseOutput?.chapters.map((chapter, index) => (
              <div
                key={index}
                className="relative px-4 py-1 cursor-pointer"
                onClick={() => {
                  setSelectedChapter(chapter);
                  getSelectedChapterContent(course.courseId, index);
                  setOpen(false);
                }}
              >
                {selectedChapter?.chapterName === chapter?.chapterName && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#155DFC] rounded-r-full" />
                )}

                <div
                  className={`
            rounded-xl px-3 py-2 mb-1 transition-all
            ${
              selectedChapter?.chapterName === chapter?.chapterName
                ? "bg-blue-50 text-slate-900 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }
          `}
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 MODERN DESKTOP SIDEBAR (Untouched as requested) */}
        <div className="fixed hidden md:flex flex-col md:w-80 pt-16 top-0 h-screen border-r border-gray-200 bg-white">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-xl text-slate-800 tracking-tight leading-tight">
              {course?.courseOutput?.courseName}
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              Course Content
            </p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200">
            {course?.courseOutput?.chapters.map((chapter, index) => (
              <div
                key={index}
                className={`relative px-4 py-1 group transition-all duration-200 cursor-pointer`}
                onClick={() => {
                  setSelectedChapter(chapter);
                  getSelectedChapterContent(course.courseId, index);
                }}
              >
                {selectedChapter?.chapterName === chapter?.chapterName && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#155DFC] rounded-r-full" />
                )}

                <div
                  className={`
    rounded-xl px-3 py-2 mb-1 transition-all
    ${
      selectedChapter?.chapterName === chapter?.chapterName
        ? "bg-blue-50 text-slate-900 shadow-sm"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }
  `}
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Main Content Area */}
        <div
          className={`pt-4 transition-all duration-300 ${
            open ? "md:ml-80" : "md:ml-80"
          } px-4 md:px-8`}
        >
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
