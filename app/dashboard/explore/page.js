import React from "react";
import CourseList from "../_components/CourseList";

const explorePage = () => {
  return (
    <>
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl text-black font-semibold">Explore Courses</h2>
        <p className="text-gray-500 text-md sm:text-base">
          Discover courses from other users
        </p>
      </div>
      <CourseList />
    </>
  );
};

export default explorePage;
