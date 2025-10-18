import React from 'react'
import { BsBarChart } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { PiVideo } from "react-icons/pi";

const CourseDetail = ({ course }) => {
  return (
    <div className='p-10 rounded-xl border shadow-sm mt-5 gap-10 flex justify-around'>
      <div className="flex level gap-5">
        <div>
          <BsBarChart className='text-5xl text-blue-700' />
        </div>
        <div>
          <h3>Skill Level</h3>
          <h1 className='font-bold text-xl'>{course.courseOutput.level}</h1>
        </div>
      </div>
      <div className="duration flex gap-5">
        <div>
          <LuClock4 className='text-5xl text-blue-700' />
        </div>
        <div>
          <h3>Duration</h3>
          <h1 className='font-bold text-xl'>{course.courseOutput.duration}</h1>
        </div>
      </div>
      <div className="chapters flex gap-5">
        <div>
          <GoBook className='text-5xl text-blue-700' />
        </div>
        <div>
          <h3>No of Chapters</h3>
          <h1 className='font-bold text-xl'>{course.courseOutput.chapters.length}</h1>
        </div>
      </div>
      <div className="video flex gap-5">
        <div>
          <PiVideo className='text-5xl text-blue-700' />
        </div>
        <div>
          <h3>Video Included?</h3>
          <h1 className='font-bold text-xl'>{course.includeVideo}</h1>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail