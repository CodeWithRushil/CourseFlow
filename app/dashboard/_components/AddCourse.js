"use client"
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'

const AddCourse = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h2 className='text-2xl'>Hello, <span className='text-black font-bold '>Insert Username here!</span></h2>
        {/* <h2 className='text-2xl'>Hello, <span className='text-black font-bold '>{user.fullName}!</span></h2> */}
        <p>Create new course with AI.</p>
      </div>
      <Link href='/create-course'>
        <button className='flex items-center bg-purple-600 text-white h-10 p-3 cursor-pointer rounded'>+ Create AI Course</button>
      </Link>

    </div>
  )
}

export default AddCourse