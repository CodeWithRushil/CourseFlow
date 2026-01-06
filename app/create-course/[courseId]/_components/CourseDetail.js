import React from "react";
import { BsBarChart } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { PiVideo } from "react-icons/pi";

const CourseDetail = ({ course }) => {
  return (
    <div
      className="
        mt-5 rounded-xl border
        grid grid-cols-2
        md:grid-cols-4
      "
    >
      {/* Skill Level */}
      <div
        className="p-6 flex flex-col items-center text-center gap-2
                      border-b border-r
                      md:border-none"
      >
        <BsBarChart className="text-4xl text-[#155DFC]" />
        <h3 className="text-sm text-gray-500">Skill Level</h3>
        <h1 className="font-bold text-lg md:text-xl">
          {course.courseOutput.level}
        </h1>
      </div>

      {/* Duration */}
      <div
        className="p-6 flex flex-col items-center text-center gap-2
                      border-b
                      md:border-none"
      >
        <LuClock4 className="text-4xl text-[#155DFC]" />
        <h3 className="text-sm text-gray-500">Duration</h3>
        <h1 className="font-bold text-lg md:text-xl">
          {course.courseOutput.duration}
        </h1>
      </div>

      {/* Chapters */}
      <div
        className="p-6 flex flex-col items-center text-center gap-2
                      border-r
                      md:border-none"
      >
        <GoBook className="text-4xl text-[#155DFC]" />
        <h3 className="text-sm text-gray-500">No of Chapters</h3>
        <h1 className="font-bold text-lg md:text-xl">
          {course.courseOutput.chapters.length}
        </h1>
      </div>

      {/* Video */}
      <div
        className="p-6 flex flex-col items-center text-center gap-2
                      md:border-none"
      >
        <PiVideo className="text-4xl text-[#155DFC]" />
        <h3 className="text-sm text-gray-500">Videos Included?</h3>
        <h1 className="font-bold text-lg md:text-xl">{course.includeVideo}</h1>
      </div>
    </div>
  );
};

export default CourseDetail;
