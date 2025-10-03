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
    <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
      {/* Difficulty Level */}
      <div>
        <label
          htmlFor="level"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Difficulty Level
        </label>
        <select
          id="level"
          defaultValue={userCourseInput.level}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleOptionChange("level", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advance">Advance</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Course Duration
        </label>
        <select
          id="duration"
          defaultValue={userCourseInput.duration}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleOptionChange("duration", e.target.value)}
        >
          <option value="">Select</option>
          <option value="1 Hour">1 Hour</option>
          <option value="2 Hours">2 Hours</option>
          <option value="More than 3 hours">More than 3 Hours</option>
        </select>
      </div>

      {/* Add Video */}
      <div>
        <label
          htmlFor="video"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Add Video
        </label>
        <select
          id="video"
          defaultValue={userCourseInput.displayVideo}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleOptionChange("displayVideo", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* No of Chapters */}
      <div>
        <label
          htmlFor="number-input"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          No of Chapters
        </label>
        <input
          type="number"
          defaultValue={userCourseInput.chapters}
          id="number-input"
          placeholder="Enter"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => handleOptionChange("chapters", e.target.value)}
          required
        />
      </div>
    </form>


  )
}

export default Options