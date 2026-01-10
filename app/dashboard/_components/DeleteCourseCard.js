"use client";
import React from "react";
import Image from "next/image";
import DeleteCourse from "./DeleteCourse";

const DeleteCourseCard = ({ userCourse, refreshCourses }) => {
  return (
    <div className="cursor-not-allowed border-2 border-gray-200 hover:tra bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 transform transition-transform duration-300 hover:scale-102">
      {/* Banner */}
      <div className="relative w-full h-48">
        <Image
          src={userCourse.courseBanner || "/placeholder.jpg"}
          alt={userCourse.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
          {userCourse.courseOutput?.courseName || userCourse.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {userCourse.courseOutput?.description || "No description available."}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span className="px-2 py-1 bg-blue-100 text-[#155DFC] rounded-full text-xs font-medium">
            {userCourse.category}
          </span>
          <span className="capitalize">{userCourse.level}</span>
        </div>

        {/* Delete action */}
        <div className="mt-4 pt-2 border-t w-full border-gray-200">
          <DeleteCourse course={userCourse} refreshCourses={refreshCourses} />
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseCard;
