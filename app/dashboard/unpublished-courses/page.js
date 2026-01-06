import React from "react";
import UnpublishedCourseList from "../_components/UnpublishedCourseList";

const UnpublishedCourses = () => {
  return (
    <>
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl text-black font-semibold">
          Unpublished Courses
        </h2>
        <p className="text-gray-500 text-md sm:text-base">
          Awaiting content generation
        </p>
      </div>
      <UnpublishedCourseList />
    </>
  );
};

export default UnpublishedCourses;
