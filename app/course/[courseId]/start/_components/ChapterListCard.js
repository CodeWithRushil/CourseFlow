import React from 'react'

const ChapterListCard = ({chapter, index}) => {
  return (
    <div className='grid grid-cols-5 p-4 border-b items-center'>
        <div>
            <h2 className='p-1 bg-purple-600 text-white rounded-full h-8 w-8 text-center'>{index+1}</h2>
        </div>
        <div className='col-span-4'>
            <h2 className='font-semibold'>{chapter.chapterName}</h2>
            <h2 className='font-medium text-purple-600'>{chapter.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard