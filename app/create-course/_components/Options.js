import { UserInputContext } from '@/app/_context/UserInputContext';
import React, { useContext, useEffect } from 'react'

const Options = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleOptionChange = (field, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput])

  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="level"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Difficulty Level
      </label>
      <select
        id="level"
        defaultValue={userCourseInput.level}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { handleOptionChange('level', e.target.value) }}
      >
        <option value="">Select</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advance">Advance</option>
      </select>
      <label
        htmlFor="duration"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Course Duration
      </label>
      <select
        id="duration"
        defaultValue={userCourseInput.duration}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => { handleOptionChange('duration', e.target.value) }}
      >
        <option value="">Select</option>
        <option value="1 Hour">1 Hour</option>
        <option value="2 Hours">2 Hours</option>
        <option value="More than 3 hours">More than 3 Hours</option>
      </select>
      <label
        htmlFor="video"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Add Video
      </label>
      <select
        id="video"
        defaultValue={userCourseInput.displayVideo}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => { handleOptionChange('displayVideo', e.target.value) }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <label
        htmlFor="number-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        No of Chapters
      </label>
      <input
        type="number"
        defaultValue={userCourseInput.chapters}
        id="number-input"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter"
        onChange={(e) => { handleOptionChange('chapters', e.target.value) }}
        required=""
      />

    </form>

  )
}

export default Options