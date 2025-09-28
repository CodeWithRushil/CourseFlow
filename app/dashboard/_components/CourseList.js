"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const CourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (user) getAllCourses();
  }, [user]);

  const getAllCourses = async () => {
    try {
      const res = await fetch("/api/getAllCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });
      const data = await res.json();
      setCourseList(data.allCourses || []);
      console.log("All Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting all courses:", err);
    }
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {courseList.length > 0 ? (
        courseList.map((Course, index) => (
          <CourseCard key={index} course={Course} refreshCourses={getAllCourses}/>
        ))
      ) : (
        [1,2,3,4,5,6].map((index)=>(
          <div key={index} className='w-full bg-slate-300 animate-pulse rounded-lg h-80'></div>
        ))
      )}
    </div>
  );
};

export default CourseList;
