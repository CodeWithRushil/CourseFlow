import { UserInputContext } from "@/app/_context/UserInputContext";
import React, { useContext, useEffect } from "react";

const Topic = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const handleInputChange = (field, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  return (
    <>
      {/* Topic */}
      <div className="mt-8 mb-6">
        <label
          htmlFor="topic-input"
          className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
        >
          Enter the topic
        </label>

        <input
          type="text"
          id="topic-input"
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput?.topic}
          placeholder="Topic"
          className="
        w-full
        rounded-lg
        border
        border-gray-300
        bg-gray-50
        px-3
        py-2.5
        sm:px-4
        sm:py-3
        text-sm
        sm:text-base
        text-gray-900
        focus:ring-2
        focus:ring-[#155DFC]
        focus:border-[#155DFC]
        transition
      "
        />
      </div>

      {/* Description */}
      <div className="mb-2">
        <label
          htmlFor="description-input"
          className="block mb-2 text-sm sm:text-base font-medium text-gray-900"
        >
          Description about the course
        </label>

        <textarea
          id="description-input"
          rows={4}
          onChange={(e) => handleInputChange("description", e.target.value)}
          defaultValue={userCourseInput?.description}
          placeholder="About your course"
          className="
        w-full
        rounded-lg
        border
        border-gray-300
        bg-gray-50
        px-3
        py-3
        sm:px-4
        text-sm
        sm:text-base
        text-gray-900
        focus:ring-2
        focus:ring-[#155DFC]
        focus:border-[#155DFC]
        transition
        resize-none
      "
        />
      </div>
    </>
  );
};

export default Topic;
