import { UserInputContext } from '@/app/_context/UserInputContext'
import React, { useContext, useEffect } from 'react'
import {CategoryList} from '@/app/_shared/CategoryList';

const Category = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category
    }))
  }

  useEffect(()=>{
    console.log(userCourseInput);
  }, [userCourseInput])

  
  return (
    <>
      <h1 className='mt-10 mb-5'>Select the Course Category</h1>
      <div className="flex justify-evenly gap-6">
        {CategoryList.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryChange(item.name)}
            className={`border border-black cursor-pointer h-35 w-35 text-center flex items-center justify-center rounded-2xl transition-all 
              ${userCourseInput.category === item.name 
                ? "bg-blue-600 text-white" 
                : "bg-blue-300 hover:bg-blue-500 hover:text-white"}`}
          >
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default Category