import { UserInputContext } from '@/app/_context/UserInputContext';
import React, { useContext, useEffect } from 'react'

const Topic = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (field, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput])

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter the topic
        </label>
        <input
          type="text"
          onChange={(e) => { handleInputChange('topic', e.target.value) }}
          id="default-input"
          defaultValue={userCourseInput?.topic}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Desciption about the course
        </label>
        <input
          type="text"
          onChange={(e) => { handleInputChange('description', e.target.value) }}
          id="large-input"
          defaultValue={userCourseInput?.description}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </>

  )
}

export default Topic