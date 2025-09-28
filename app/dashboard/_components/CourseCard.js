import React from "react";
import Image from "next/image";

const CourseCard = ({ course }) => {
  return (
    <div className="cursor-pointer hover:tra bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 transform transition-transform duration-300 hover:scale-102">
      
      <div className="relative w-full h-48">
        <Image
          src={course.courseBanner || "/placeholder.jpg"}
          alt={course.name}
          layout="fill"
          className="object-cover"
        />
      </div>

      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900">
          {course.courseOutput?.courseName || course.name}
        </h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {course.courseOutput?.description || "No description available."}
        </p>

       
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
            {course.category}
          </span>
          <span className="capitalize">{course.level}</span>
        </div>

        
        <div className="flex items-center mt-4">
          <Image
            src={course.userProfileImage || "/user-placeholder.png"}
            alt={course.username}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="ml-2 text-sm text-gray-700">{course.username}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
