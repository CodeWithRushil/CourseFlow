"use client";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import MainLoader from "@/components/MainLoader";
import CourseDetail from "../_components/CourseDetail";
import Chapters from "../_components/Chapters";
import CourseUrlShare from "@/components/CourseUrlShare";

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
        courseId: params.courseId,
      }),
    });
    const data = await result.json();
    if (data.course.published) {
      redirect("/course/" + params.courseId);
    }
    // console.log("API response:", data);
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
          <h2 className="font-semibold text-center text-xl sm:text-2xl">
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

          <CourseUrlShare courseId={course.courseId} />

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
