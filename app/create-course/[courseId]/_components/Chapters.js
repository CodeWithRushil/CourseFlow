import React from 'react'
import EditChapter from './EditChapter'

const Chapters = ({course, refreshData, edit=true }) => {
  return (
    <>
    <h3 className='py-4 font-bold text-xl'>Chapters</h3>
    {course.courseOutput.chapters.map((item, index)=>(
        <div key={index} className='p-10 rounded-xl border shadow-sm mt-5 gap-10 flex items-center'>
            <div className='bg-purple-500 w-12 h-12 text-white rounded-full flex items-center justify-center aspect-square font-semibold'>{index+1}</div>
            <div><h1 className='font-bold'>{item.chapterName} {edit && <EditChapter course={course} index={index} refreshData={()=> refreshData(true)}/>} </h1>
            <h1>{item.about}</h1>
            <h1 className='font-semibold text-purple-500'>{item.duration}</h1></div>
        </div>
    ))}
    </>
  )
}

export default Chapters