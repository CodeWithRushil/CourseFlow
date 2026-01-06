"use client";
import React, { useEffect, useState } from "react";
import UserCourseCard from "./UserCourseCard";
import { useUser } from "@clerk/nextjs";

const UnpublishedCourseList = () => {
  const { user } = useUser();
  const [unpublishedCourseList, setUnpublishedCourseList] = useState([]);

  useEffect(() => {
    if (user) getUnpublishedCourses();
  }, [user]);

  const getUnpublishedCourses = async () => {
    try {
      const res = await fetch("/api/getUnpublishedCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await res.json();
      setUnpublishedCourseList(data.unpublishedCourses || []);
      console.log("Unpublished Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting Unpublished courses:", err);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {unpublishedCourseList.length > 0
        ? unpublishedCourseList.map((unpublishedCourse, index) => (
            // FIX THE LINK TO GENERATE COURSE CONTENT PAGE INSTEAD FOR THIS ONE
            <UserCourseCard
              key={index}
              userCourse={unpublishedCourse}
              refreshCourses={getUnpublishedCourses}
              unpublished={true}
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

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="h-6 w-20 bg-slate-200 rounded-full" />
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default UnpublishedCourseList;
