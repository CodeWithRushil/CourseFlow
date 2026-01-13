"use client";
import React, { useEffect, useState } from "react";
import UserCourseCard from "./UserCourseCard";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const UnpublishedCourseList = () => {
  const { user } = useUser();
  const [unpublishedCourseList, setUnpublishedCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getUnpublishedCourses();
  }, [user]);

  const getUnpublishedCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getUnpublishedCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });
      const data = await res.json();
      setUnpublishedCourseList(data.unpublishedCourses || []);
    } catch (err) {
      console.error("Error getting Unpublished courses:", err);
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
            className="border-2 border-blue-100 bg-white rounded-xl overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-slate-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="flex items-center justify-between mt-4">
                <div className="h-6 w-20 bg-slate-200 rounded-full" />
                <div className="h-4 w-12 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        ))}

      {!loading &&
        unpublishedCourseList.length > 0 &&
        unpublishedCourseList.map((unpublishedCourse, index) => (
          <UserCourseCard
            key={index}
            userCourse={unpublishedCourse}
            refreshCourses={getUnpublishedCourses}
            unpublished={true}
          />
        ))}

      {!loading && unpublishedCourseList.length === 0 && (
        <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center py-16">
          <Image
            src="/empty-course.gif"
            alt="No courses"
            width={100}
            height={100}
            className="mb-2"
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No unpublished courses
          </h3>
          <p className="text-gray-600 max-w-sm">
            All your courses are published.
          </p>
          <p className="text-gray-600 max-w-sm">
            Unpublished courses will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default UnpublishedCourseList;
