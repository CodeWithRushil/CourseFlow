"use client";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useUser } from "@clerk/nextjs";
import React, { Profiler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCopy } from "react-icons/fa";
import ProfileHeader from "@/components/ProfileHeader";

const FinishPage = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
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
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    const data = await result.json();
    console.log("API response:", data);
    if (data.success) {
      setCourse(data.course);
    }
  };
  return (
    <>
      <ProfileHeader />
      <div className="mt-24 px-7 md:px-20 lg:px-44">
        <h2 className="font-bold text-center text-2xl">
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
        {/* URL label */}
        <h2 className="mt-6 font-semibold text-sm sm:text-base">Course URL:</h2>

        {/* URL box */}
        <div
          className="mt-2 mb-20 w-full border rounded-md p-3
               flex items-center gap-3
               text-gray-400 text-sm sm:text-base
               break-all sm:break-normal
               justify-between"
        >
          <span className="truncate sm:whitespace-normal">
            {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course.courseId}
          </span>

          <button
            className="flex-shrink-0 text-[#155DFC] cursor-pointer"
            onClick={async () => {
              await navigator.clipboard.writeText(
                process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course.courseId
              );
            }}
            aria-label="Copy course link"
          >
            <FaRegCopy className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FinishPage;
