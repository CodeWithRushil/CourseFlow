"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { CheckCircle2, ChevronDown, Circle, List, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MainLoader from "@/components/MainLoader";
import Footer from "@/components/Footer";
import DashboardBackButton from "@/components/DashboardBackButton";

function progressStorageKey(courseId) {
  return `courseflow_progress_${courseId}`;
}

function loadCompleted(courseId) {
  if (typeof window === "undefined" || !courseId) return new Set();
  try {
    const raw = localStorage.getItem(progressStorageKey(courseId));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(
      parsed.map(Number).filter((n) => Number.isInteger(n) && n >= 0)
    );
  } catch {
    return new Set();
  }
}

function saveCompleted(courseId, completedSet) {
  if (typeof window === "undefined" || !courseId) return;
  try {
    localStorage.setItem(
      progressStorageKey(courseId),
      JSON.stringify([...completedSet])
    );
  } catch {
    // ignore quota / private mode errors
  }
}

const StartCourse = ({ params }) => {
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState({});
  const [selectedChapterContent, setSelectedChapterContent] = useState({});
  const [selectedChapter, setSelectedChapter] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(() => new Set());
  const [progressReady, setProgressReady] = useState(false);

  const includeVideo = course?.includeVideo === "Yes";
  const chapters = course?.courseOutput?.chapters || [];
  const courseTitle =
    course?.courseOutput?.courseName || course?.name || "Course";
  const progress =
    chapters.length === 0
      ? 0
      : Math.round((completed.size / chapters.length) * 100);

  useEffect(() => {
    if (!params?.courseId) return;
    setCompleted(loadCompleted(params.courseId));
    setProgressReady(true);
  }, [params?.courseId]);

  useEffect(() => {
    if (!progressReady || !params?.courseId) return;
    saveCompleted(params.courseId, completed);
  }, [completed, params?.courseId, progressReady]);

  useEffect(() => {
    if (user) getCourse();
  }, [user]);

  useEffect(() => {
    if (selectedChapter) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedChapter]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const getCourse = async () => {
    const res = await fetch("/api/getCourseData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setCourse(data.course);
      const firstChapter = data.course?.courseOutput?.chapters?.[0];
      if (firstChapter) {
        setSelectedChapter(firstChapter);
        setSelectedIndex(0);
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

  const selectChapter = (chapter, index) => {
    setSelectedChapter(chapter);
    setSelectedIndex(index);
    getSelectedChapterContent(course.courseId, index);
    setOpen(false);
  };

  const toggleComplete = (index, e) => {
    e?.stopPropagation?.();
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const goNext = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(selectedIndex);
      return next;
    });
    if (selectedIndex < chapters.length - 1) {
      const nextIndex = selectedIndex + 1;
      selectChapter(chapters[nextIndex], nextIndex);
    }
  };

  const goPrev = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      selectChapter(chapters[prevIndex], prevIndex);
    }
  };

  const renderChapterList = () =>
    chapters.map((chapter, index) => {
      const isActive = selectedChapter?.chapterName === chapter?.chapterName;
      const isDone = completed.has(index);
      return (
        <div
          key={index}
          className="relative px-3 py-1 group transition-all duration-200"
        >
          {isActive && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#155DFC] rounded-r-full" />
          )}

          <div
            className={`
              flex items-stretch gap-1 rounded-xl px-1 py-1 mb-1 transition-all
              ${
                isActive
                  ? "bg-blue-50 text-slate-900 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
            `}
          >
            <button
              type="button"
              className={`flex-shrink-0 size-9 rounded-full inline-flex items-center justify-center transition-colors ${
                isDone
                  ? "text-green-600 hover:bg-green-50"
                  : "text-slate-400 hover:bg-slate-100 hover:text-[#155DFC]"
              }`}
              onClick={(e) => toggleComplete(index, e)}
              title={isDone ? "Mark as not done" : "Mark as done"}
              aria-label={isDone ? "Mark as not done" : "Mark as done"}
            >
              {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>

            <button
              type="button"
              className="flex-1 min-w-0 text-left cursor-pointer rounded-lg px-2 py-1"
              onClick={() => selectChapter(chapter, index)}
            >
              <ChapterListCard
                chapter={chapter}
                index={index}
                isDone={isDone}
              />
            </button>
          </div>
        </div>
      );
    });

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
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Top bar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-2.5 sm:py-3 lg:px-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
              <DashboardBackButton />

              <div className="hidden sm:block w-px h-5 bg-slate-200" />

              <Link
                href="/dashboard"
                className="flex items-center gap-2 shrink-0"
              >
                <Image src="/logo.svg" alt="Logo" width={28} height={28} />
                <span className="text-xl font-semibold text-[#02060d] hidden sm:inline">
                  Course<span className="italic">Flow</span>
                </span>
              </Link>
            </div>

            <div className="flex-1 min-w-0 flex items-center gap-2 px-1 sm:px-3 max-w-md mx-auto">
              <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#155DFC] transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 whitespace-nowrap">
                {progress}%
              </span>
            </div>

            <div className="shrink-0">
              {isLoaded ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile chapter picker */}
      <div className="md:hidden fixed top-[53px] left-0 right-0 z-40 bg-white border-b border-gray-200 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-left"
          aria-expanded={open}
        >
          <List size={18} className="text-[#155DFC] shrink-0" />
          <span className="flex-1 min-w-0 flex flex-col gap-0.5">
            <strong className="text-[11px] font-bold text-[#155DFC] tracking-wide">
              Chapter {Math.min(selectedIndex + 1, chapters.length)} of{" "}
              {chapters.length}
            </strong>
            <em className="not-italic text-sm font-semibold text-slate-900 truncate">
              {selectedChapter?.chapterName || "Select chapter"}
            </em>
          </span>
          <ChevronDown size={18} className="text-slate-500 shrink-0" />
        </button>
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={`md:hidden fixed inset-0 z-[80] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-900/45 transition-opacity duration-200 border-0 p-0 cursor-pointer ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          aria-label="Close chapters"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Course chapters"
          className={`absolute left-0 right-0 bottom-0 max-h-[min(82dvh,640px)] bg-white rounded-t-[18px] shadow-[0_-12px_40px_rgba(15,23,42,0.18)] flex flex-col overflow-hidden transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b border-slate-100 shrink-0">
            <div className="min-w-0">
              <h2 className="m-0 mb-1 text-[17px] font-semibold text-slate-900 truncate">
                {courseTitle}
              </h2>
              <p className="m-0 text-xs text-slate-400 uppercase tracking-wider font-medium">
                Course Content
              </p>
            </div>
            <button
              type="button"
              className="size-9 shrink-0 inline-flex items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-600"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto py-3 pb-6 overscroll-contain">
            {renderChapterList()}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed hidden md:flex flex-col w-80 top-[57px] h-[calc(100vh-57px)] border-r border-gray-200 bg-white overflow-hidden z-30">
        <div className="mt-2 p-6 border-b border-gray-200 shrink-0">
          <h2 className="font-semibold text-xl text-slate-800 tracking-tight leading-tight">
            {courseTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
            Course Content
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200">
          {renderChapterList()}
        </div>
      </aside>

      {/* Main content — extra top padding on mobile for nav + chapter picker */}
      <main className="pt-[126px] md:pt-[57px] md:ml-80 min-h-[100dvh] bg-[#f3f4f6]">
        <div className="px-3 sm:px-4 md:px-8 pb-8">
          <ChapterContent
            chapter={selectedChapter}
            includeVideo={includeVideo}
            content={selectedChapterContent}
            chapterIndex={selectedIndex}
            chapterCount={chapters.length}
            onPrev={goPrev}
            onNext={goNext}
            isFirst={selectedIndex === 0}
            isLast={selectedIndex === chapters.length - 1}
          />
        </div>
      </main>

      <div className="md:ml-80">
        <Footer />
      </div>
    </div>
  );
};

export default StartCourse;
