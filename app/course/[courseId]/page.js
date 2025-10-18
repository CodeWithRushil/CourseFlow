"use client"
import Chapters from '@/app/create-course/[courseId]/_components/Chapters'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';

const ViewCourse = ({ params }) => {
    const { user } = useUser();
    const [course, setCourse] = useState({});

    useEffect(() => {
        if (params?.courseId && user) {
            getCourseLayout();
        }
    }, [params, user]);

    const getCourseLayout = async () => {
        const result = await fetch("/api/getCourseData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId: params.courseId,
                email: user?.primaryEmailAddress?.emailAddress
            }),
        });
        const data = await result.json();
        console.log("API response:", data);
        if (data.success) {
            setCourse(data.course);
        }
    }

    return (
        <div className='mt-30 px-7 md:px-20 lg:px-44'>
            {!course ? (
                <p>Loading course information...</p>
            ) : course.courseOutput ? (
                <>
                    <CourseBasicInfo course={course} refreshData={() => getCourseLayout()} edit={false} />
                    <CourseDetail course={course} />
                    <Chapters course={course} refreshData={() => getCourseLayout()} edit={false} />
                </>
            ) : (
                <p>Loading course information...</p>
            )}
        </div>
    )
}

export default ViewCourse