import React from 'react'
import UnpublishedCourseList from '../_components/UnpublishedCourseList'

const UnpublishedCourses = () => {
  return (
    <>
      <h2 className='text-2xl text-black font-bold'>Your Unpublished Courses</h2>
      <UnpublishedCourseList />
    </>
  )
}

export default UnpublishedCourses