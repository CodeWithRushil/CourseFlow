import React, { useEffect, useState } from 'react'
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
} from "@/components/ui/alert-dialog"

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
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><h3 className='mt-3 text-white bg-red-500 text-sm p-2 rounded-full cursor-pointer'>Delete</h3></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Course</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure that you want to delete this course?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer" onClick={deleteCourseHandler}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCourse