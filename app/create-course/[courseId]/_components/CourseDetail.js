import React from 'react'

const CourseDetail = ({course}) => {
  return (
    <div className='p-10 rounded-xl border shadow-sm mt-5 gap-10 flex justify-around'>
      <div className="level">
        <h3>Skill Level</h3>
        <h1 className='font-bold text-xl'>{course.courseOutput.level}</h1>
      </div>
      <div className="duration">
        <h3>Duration</h3>
        <h1 className='font-bold text-xl'>{course.courseOutput.duration}</h1>
      </div>
      <div className="chapters">
        <h3>No of Chapters</h3>
        <h1 className='font-bold text-xl'>{course.courseOutput.chapters.length}</h1>
      </div>
      <div className="video">
        <h3>Video Included?</h3>
        <h1 className='font-bold text-xl'>{course.includeVideo}</h1>
      </div>
    </div>
  )
}

export default CourseDetail