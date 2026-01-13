"use client";
import { useUser } from "@clerk/nextjs";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";
import React from "react";

const AddCourse = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="px-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {!isLoaded ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-7 w-55 sm:h-8 sm:w-60 bg-gray-200 rounded" />
            <div className="h-4 w-50 bg-gray-200 rounded" />
          </div>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl">
              Hello,{" "}
              <span className="text-black font-semibold">{user?.fullName}</span>
            </h2>
            <p className="text-gray-500 text-md sm:text-base">
              Create a new course with AI
            </p>
          </>
        )}
      </div>

      {/* Button */}
      <Link href="/create-course" className="w-full sm:w-auto">
        <button
          className="w-full sm:w-auto flex items-center justify-center gap-2
               bg-[#155DFC] text-white h-10 px-4 rounded-lg
               hover:bg-blue-700 transition cursor-pointer"
        >
          <HiSparkles className="text-lg" />
          Create AI Course
        </button>
      </Link>
    </div>
  );
};

export default AddCourse;
