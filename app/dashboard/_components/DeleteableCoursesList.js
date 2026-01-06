"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import DeleteCourseCard from "./DeleteCourseCard";

const DeletableCourseList = () => {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    try {
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
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userCourseList.length > 0
        ? userCourseList.map((userCourse, index) => (
            <DeleteCourseCard
              key={index}
              userCourse={userCourse}
              refreshCourses={getUserCourses}
            />
          ))
        : [1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="border-2 border-gray-200 bg-white rounded-xl overflow-hidden animate-pulse">
              {/* Banner skeleton */}
              <div className="w-full h-48 bg-slate-200" />

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-slate-200 rounded w-3/4" />

                {/* Description */}
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />

                {/* Category + Level */}
                <div className="flex items-center justify-between mt-4">
                  <div className="h-6 w-20 bg-slate-200 rounded-full" />
                  <div className="h-4 w-14 bg-slate-200 rounded" />
                </div>

                {/* Delete button skeleton */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="h-8 w-full bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default DeletableCourseList;
