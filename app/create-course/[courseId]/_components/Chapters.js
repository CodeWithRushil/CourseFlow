import React from "react";
import EditChapter from "./EditChapter";
import { LuClock4 } from "react-icons/lu";

const Chapters = ({ course, refreshData, edit = true }) => {
  return (
    <>
      <h3 className="py-4 font-bold text-xl">Chapters</h3>

      {course.courseOutput.chapters.map((item, index) => (
        <div
          key={index}
          className="
            p-6 md:p-10
            rounded-xl border
            mt-5
            flex flex-col md:flex-row
            items-start md:items-center
            gap-4 md:gap-10
          "
        >
          {/* Chapter Index */}
          <div
            className="bg-[#155DFC] w-12 h-12 text-white rounded-full 
                          flex items-center justify-center aspect-square font-semibold shrink-0"
          >
            {index + 1}
          </div>

          {/* Chapter Content */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold flex gap-2 items-center">
              {item.chapterName}
              {edit && (
                <EditChapter
                  course={course}
                  index={index}
                  refreshData={() => refreshData(true)}
                />
              )}
            </h1>

            <p className="text-gray-600 text-sm md:text-base">{item.about}</p>

            <div className="font-semibold text-[#155DFC] flex gap-1 items-center text-sm">
              <LuClock4 className="text-[#155DFC] text-lg" />
              {item.duration}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Chapters;
