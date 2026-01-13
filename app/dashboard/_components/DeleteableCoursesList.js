"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import DeleteCourseCard from "./DeleteCourseCard";
import Image from "next/image";

const DeletableCourseList = () => {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getUserCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await res.json();
      setUserCourseList(data.userCourses || []);
      console.log("User Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting user courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading &&
        [1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="border-2 border-red-100 bg-white rounded-xl overflow-hidden animate-pulse"
          >
            {/* Banner skeleton */}
            <div className="w-full h-48 bg-slate-200" />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />

              <div className="flex items-center justify-between mt-4">
                <div className="h-6 w-20 bg-slate-200 rounded-full" />
                <div className="h-4 w-14 bg-slate-200 rounded" />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="h-8 w-full bg-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}

      {!loading &&
        userCourseList.length > 0 &&
        userCourseList.map((userCourse, index) => (
          <DeleteCourseCard
            key={index}
            userCourse={userCourse}
            refreshCourses={getUserCourses}
          />
        ))}

      {!loading && userCourseList.length === 0 && (
        <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center py-16">
          <Image
            src="/empty-course.gif"
            alt="No courses"
            width={100}
            height={100}
            className="mb-2"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No courses yet
          </h3>
          <p className="text-gray-600 max-w-sm">
            You haven’t created any courses yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeletableCourseList;
