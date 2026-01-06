"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (user) getAllCourses();
  }, [user]);

  const getAllCourses = async () => {
    try {
      const res = await fetch("/api/getAllCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await res.json();
      setCourseList(data.allCourses || []);
      console.log("All Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting all courses:", err);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courseList.length > 0
        ? courseList.map((Course, index) => (
            <CourseCard
              key={index}
              course={Course}
              refreshCourses={getAllCourses}
            />
          ))
        : [1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="border-2 border-blue-100 bg-white rounded-xl overflow-hidden animate-pulse">
              {/* Image skeleton */}
              <div className="w-full h-48 bg-slate-200" />

              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-slate-200 rounded w-3/4" />

                {/* Description lines */}
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />

                {/* Footer (category + level) */}
                <div className="flex items-center justify-between mt-4">
                  <div className="h-6 w-20 bg-slate-200 rounded-full" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>

                {/* Profile skeleton */}
                <div className="flex items-center mt-4">
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />

                  {/* Username */}
                  <div className="ml-2 h-4 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CourseList;
