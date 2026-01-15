"use client";
import Chapters from "@/app/create-course/[courseId]/_components/Chapters";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/ProfileHeader";
import MainLoader from "@/components/MainLoader";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const ViewCourse = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState({});

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
        courseId: params.courseId,
      }),
    });
    const data = await result.json();
    // console.log("API response:", data);
    if (data.success) {
      setCourse(data.course);
    }
  };

  return (
    <div className="mt-25 mb-20 sm:mb-25 sm:mt-30 px-7 md:px-20 lg:px-50">
      {!course ? (
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
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course.courseId}`
                  );
                  toast.success("Link Copied");
                } catch {
                  toast.error("Failed To Copy");
                }
              }}
            >
              <FaRegCopy className="text-lg sm:text-xl cursor-pointer hover:scale-105 transition-transform" />
            </button>
          </div>
          

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

export default ViewCourse;
