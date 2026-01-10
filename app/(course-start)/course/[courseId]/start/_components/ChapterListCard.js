import React from 'react'
import { LuClock4 } from 'react-icons/lu'

const ChapterListCard = ({chapter, index}) => {
  return (
    <div className='grid grid-cols-5 p-4 items-center'>
        <div>
            <h2 className='p-1 bg-[#155DFC] text-white rounded-full h-8 w-8 text-center'>{index+1}</h2>
        </div>
        <div className='col-span-4'>
            <h2 className='font-semibold'>{chapter.chapterName}</h2>
            <h2 className='font-semibold text-[#155DFC] flex gap-1 items-center text-sm'>
              <LuClock4 className="text-[#155DFC] text-base" />
              {chapter.duration}
            </h2>
        </div>
    </div>
  )
}

export default ChapterListCard