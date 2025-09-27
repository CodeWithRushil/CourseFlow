import React, { useState } from 'react'
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

const EditCourseInfo = ({ course, refreshData }) => {
    const [name, setName] = useState(course.courseOutput.courseName);
    const [description, setDescription] = useState(course.courseOutput.description);
    const onUpdateHandler = async () => {
        course.courseOutput.courseName = name;
        course.courseOutput.description = description;
        console.log("Updated Course basic: ", course);
        try {
            const res = await fetch("/api/updateCourseLayout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course),
            });
            const data = await res.json();
            console.log("Updated in Database: ", data);
            refreshData(true);
        } catch (err) {
            console.error("Error updating course:", err);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger><h3 className='text-purple-700 text-lg cursor-pointer'>Edit</h3></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Course Title & Description</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                            <input
                                defaultValue={course.courseOutput.courseName}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter course title"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full h-40 px-4 py-2 border border-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                defaultValue={course.courseOutput.description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter course description"
                            ></textarea>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 cursor-pointer" onClick={onUpdateHandler}>
                        Update
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditCourseInfo