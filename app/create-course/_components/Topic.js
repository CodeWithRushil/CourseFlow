import { UserInputContext } from "@/app/_context/UserInputContext";
import React, { useContext } from "react";

const Topic = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (field, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      {/* Topic */}
      <div className="mt-6 mb-8 sm:mb-5">
        <label
          htmlFor="topic-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Enter the topic
        </label>

        <input
          type="text"
          id="topic-input"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
          placeholder="Topic"
          className="
    w-full
    rounded-md
    border border-gray-300
    bg-gray-50

    px-4 py-3 text-base        

    sm:px-3 sm:py-2.5 sm:text-sm 

    text-gray-900
    focus:ring-2 focus:ring-[#155DFC]
    focus:border-[#155DFC]
    transition
  "
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description about the course
        </label>

        <textarea
          id="description-input"
          rows={3}
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="About your course"
          className="
    w-full
    rounded-md
    border border-gray-300
    bg-gray-50

    px-4 py-3 text-base     

    sm:px-3 sm:py-2.5 sm:text-sm 

    text-gray-900
    focus:ring-2 focus:ring-[#155DFC]
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
