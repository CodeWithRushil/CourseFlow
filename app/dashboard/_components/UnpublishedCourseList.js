"use client"
import React, { useEffect, useState } from 'react'
import UserCourseCard from './UserCourseCard';
import { useUser } from '@clerk/nextjs';

const UnpublishedCourseList = () => {
  const { user } = useUser();
  const [unpublishedCourseList, setUnpublishedCourseList] = useState([]);

  useEffect(() => {
    if (user) getUnpublishedCourses();
  }, [user]);

  const getUnpublishedCourses = async () => {
    try {
      const res = await fetch("/api/getUnpublishedCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });
      const data = await res.json();
      setUnpublishedCourseList(data.unpublishedCourses || []);
      console.log("Unpublished Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting Unpublished courses:", err);
    }
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {unpublishedCourseList.length > 0 ? (
        unpublishedCourseList.map((unpublishedCourse, index) => (
          // FIX THE LINK TO GENERATE COURSE CONTENT PAGE INSTEAD FOR THIS ONE
          <UserCourseCard key={index} userCourse={unpublishedCourse} refreshCourses={getUnpublishedCourses} />
        ))
      ) : (
        [1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className='w-full bg-slate-300 animate-pulse rounded-lg h-80'></div>
        ))
      )}
    </div>
  );
}

export default UnpublishedCourseList