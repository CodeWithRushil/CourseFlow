import React from "react";
import DeletableCourseList from "../_components/DeleteableCoursesList";

const DeleteCourses = () => {
  return (
    <>
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl text-black font-semibold">
          Delete Courses
        </h2>
        <p className="text-gray-500 text-md sm:text-base">
          Manage and remove unused courses
        </p>
      </div>
      <DeletableCourseList />
    </>
  );
};

export default DeleteCourses;
