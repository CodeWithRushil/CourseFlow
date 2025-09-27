"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import UserCourseCard from './UserCourseCard';

const UserCourseList = () => {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    try {
      const res = await fetch("/api/getUserCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });
      const data = await res.json();
      setUserCourseList(data.userCourses || []);
      console.log("User Courses Fetched Successfully: ", data);
    } catch (err) {
      console.error("Error getting user courses:", err);
    }
  };

  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {userCourseList.length > 0 ? (
        userCourseList.map((userCourse, index) => (
          <UserCourseCard key={index} userCourse={userCourse} refreshCourses={getUserCourses}/>
        ))
      ) : (
        // <p className="text-gray-500 col-span-full text-center">
        //   No courses found.
        // </p>
        [1,2,3,4,5,6].map((index)=>(
          <div key={index} className='w-full bg-slate-300 animate-pulse rounded-lg h-80'></div>
        ))
      )}
    </div>
  );
};

export default UserCourseList;
