import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

const DeleteCourse = ({ course, refreshCourses }) => {
  const deleteCourseHandler = async () => {
    try {
      const res = await fetch("/api/deleteCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      const data = await res.json();
      await refreshCourses();
      console.log("Course Deleted Successfully!");
    } catch (err) {
      console.error("Error Deleting Course:", err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
    className="mt-3 flex items-center gap-2 
               rounded-lg border border-red-200 
               bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600
               hover:bg-red-100 hover:text-red-700
               transition cursor-pointer w-full justify-center items-center"
  >
    <Trash2 className="h-4 w-4" />
    Delete Course
  </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Course</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure that you want to delete this course?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="px-6 py-2 bg-[#155DFC] text-white font-semibold rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer"
            onClick={deleteCourseHandler}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCourse;
