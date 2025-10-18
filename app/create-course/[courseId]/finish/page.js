"use client"
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegCopy } from "react-icons/fa";

const FinishPage = ({ params }) => {
  const { user } = useUser();
  const router = useRouter();
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
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Congrats! Your course is ready!</h2>
      <CourseBasicInfo course={course} refreshData={() => getCourseLayout()} edit={false} />
      <h2 className='mt-6 font-semibold'>Course URL:</h2>
      <h2 className='text-center text-gray-400 border p-2 round flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/{course.courseId} <h2 className='font-bold text-blue-700 cursor-pointer' onClick={async ()=>{ await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME + "/course/" + course.courseId)}}><FaRegCopy className='text-xl'/></h2></h2>
    </div>
  )
}

export default FinishPage;