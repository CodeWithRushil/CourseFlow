import React from "react";
import Image from "next/image";
import DeleteCourse from "./DeleteCourse";
import Link from "next/link";

const UserCourseCard = ({ userCourse, refreshCourses }) => {
  return (
    <Link href={"/course/" + userCourse.courseId}>
      <div className="cursor-pointer hover:tra bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 transform transition-transform duration-300 hover:scale-102">

        <div className="relative w-full h-48">
          <Image
            src={userCourse.courseBanner || "/placeholder.jpg"}
            alt={userCourse.name}
            layout="fill"
            className="object-cover"
          />
        </div>


        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900">
            {userCourse.courseOutput?.courseName || userCourse.name}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {userCourse.courseOutput?.description || "No description available."}
          </p>


          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
              {userCourse.category}
            </span>
            <span className="capitalize">{userCourse.level}</span>
          </div>

          <DeleteCourse course={userCourse} refreshCourses={refreshCourses} />
        </div>
      </div>
    </Link>
  );
};

export default UserCourseCard;
