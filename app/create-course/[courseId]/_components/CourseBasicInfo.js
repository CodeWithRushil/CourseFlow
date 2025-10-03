"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import EditCourseInfo from './EditCourseInfo';
import { Client, Storage, ID } from 'appwrite';
import Link from 'next/link';

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
    console.log("Course received:", course);
    const onFileSelected = async (event) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        const storage = new Storage(client);
        const file = event.target.files[0];
        try {
            const response = await storage.createFile(
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            );
            console.log('File uploaded Appwrite:', response);
            const fileId = response.$id;
            const downloadUrl = storage.getFileDownload(
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
                fileId
            );
            console.log("Download URL Appwrite: ", downloadUrl);
            course.courseBanner = downloadUrl;
            try {
                const res = await fetch("/api/updateCourseLayout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(course),
                });
                const data = await res.json();
                console.log("Updated Banner in Database: ", data);
                refreshData(true);
            } catch (err) {
                console.error("Error updating course banner:", err);
            }

        } catch (error) {
            console.error('Upload error Appwrite:', error);
        }
    }

    if (!course.courseOutput) {
        return (
            <div className="p-10 rounded-xl border shadow-sm mt-5">
                <p className="text-gray-500">Loading course info...</p>
            </div>
        );
    }
    return (
        <>
            <div className='p-10 rounded-xl border shadow-sm mt-5 gap-10'>
                <div className='grid grid-cols-3 md:grid-cols-2 gap-10'>
                    <div>
                        <h2 className='flex font-bold text-2xl gap-2'>
                            {course.courseOutput.courseName}
                            {edit && <EditCourseInfo course={course} refreshData={() => refreshData(true)} />}
                        </h2>
                        <p className='text-sm text-gray-400 mt-3'>
                            {course.courseOutput.description}
                        </p>
                        <h1 className='font-bold text-blue-500'>{course.courseOutput.category}</h1>
                        {!edit && <Link href={"/course/" + course.courseId + "/start"}>
                            <button type="button" className="w-full focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500 font-semibold cursor-pointer">Start</button>
                        </Link>}

                    </div>
                    <div>
                        <label htmlFor="upload-image">
                            <Image
                                src={course.courseBanner}
                                height={300}
                                width={300}
                                alt='CourseImage'
                                className='w-full rounded-xl h-[250px] object-fill cursor-pointer'
                            />
                        </label>
                        <input type="file" onChange={onFileSelected} name="upload-image" id="upload-image" className='opacity-0' />
                    </div>
                </div>
            </div>
        </>
    )
}


export default CourseBasicInfo
