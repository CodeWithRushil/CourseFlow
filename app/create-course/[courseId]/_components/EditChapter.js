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

const EditChapter = ({ course, index, refreshData}) => {
    const [name, setName] = useState(course.courseOutput.chapters[index].courseName);
    const [about, setAbout] = useState(course.courseOutput.chapters[index].about);
    useEffect(()=>{
        setName(course.courseOutput.chapters[index].chapterName);
        setAbout(course.courseOutput.chapters[index].about);
    }, [course, index])

    const onUpdateHandler = async () => {
        course.courseOutput.chapters[index].chapterName = name;
        course.courseOutput.chapters[index].about = about;
        console.log("Updated Course Chapters basic: ", course);
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
                    <AlertDialogTitle>Edit Chapter</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chapter Title</label>
                            <input
                                defaultValue={course.courseOutput.chapters[index].chapterName}
                                type="text"
                                className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Enter chapter title"
                                onChange={(e)=>{setName(e.target.value)}}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full h-40 px-4 py-2 border border-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                defaultValue={course.courseOutput.chapters[index].about}
                                placeholder="Enter chapter description"
                                onChange={(e)=>{setAbout(e.target.value)}}
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

export default EditChapter