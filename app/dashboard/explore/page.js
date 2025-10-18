import React from 'react'
import CourseList from '../_components/CourseList'

const exlorePage = () => {
  return (
    <>
      <h2 className='text-2xl text-black font-bold'>Explore Courses</h2>
      <p className='text-gray-500'>Discover courses from other users</p>
      <CourseList />
    </>
  )
}

export default exlorePage