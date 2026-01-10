"use client";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useUser } from "@clerk/nextjs";
import React, { Profiler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCopy } from "react-icons/fa";
import ProfileHeader from "@/components/ProfileHeader";
import MainLoader from "@/components/MainLoader";
import CourseDetail from "../_components/CourseDetail";
import Chapters from "../_components/Chapters";
import Footer from "@/components/Footer";

const FinishPage = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.courseId && user) {
      getCourseLayout();
    }
  }, [params, user]);

  const getCourseLayout = async () => {
    const result = await fetch("/api/getCourseData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId
      }),
    });
    const data = await result.json();
    console.log("API response:", data);
    if (data.success) {
      setCourse(data.course);
    }
    setLoading(false);
  };
  return (
    <div className="mt-25 mb-20 sm:mb-25 sm:mt-30 sm:mt-30 px-7 md:px-20 lg:px-50">
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
      ) : course.courseOutput ? (
        <>
          <ProfileHeader />
          <h2 className="font-semibold text-center text-2xl">
            Congrats!
            <br className="block md:hidden" />
            <span className="hidden md:inline"> </span>
            Your course is ready
          </h2>
          <CourseBasicInfo
            course={course}
            refreshData={() => getCourseLayout()}
            edit={false}
          />
          <CourseDetail course={course} />

          {/* Course URL */}
          <h2 className="mt-6 font-semibold text-sm sm:text-base">
            Course URL:
          </h2>

          <div className="mt-2 mb-18 sm:mb-24 w-full border rounded-md p-3 flex items-center gap-3 text-gray-500 text-sm sm:text-base justify-between">
            <span className="break-all whitespace-normal">
              {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course.courseId}
            </span>

            <button
              className="flex-shrink-0 text-[#155DFC]"
              onClick={async () =>
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course.courseId}`
                )
              }
            >
              <FaRegCopy className="text-lg sm:text-xl" />
            </button>
          </div>
          {/* Course URL */}

          <Chapters
            course={course}
            refreshData={() => getCourseLayout()}
            edit={false}
          />
        </>
      ) : (
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
      )}
    </div>
  );
};

export default FinishPage;
