import { UserInputContext } from "@/app/_context/UserInputContext";
import React, { useContext, useEffect } from "react";
import { CategoryList } from "@/app/_shared/CategoryList";
import Image from "next/image";

const Category = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="px-5 sm:px-10">
      <h2 className="mt-10 mb-5 text-lg font-semibold text-gray-800 text-center sm:text-left">
        Select the Course Category
      </h2>

      <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-5">
        {CategoryList.map((item) => {
          const isSelected = userCourseInput?.category === item.name;

          return (
            <div
              key={item.id}
              onClick={() => handleCategoryChange(item.name)}
              className={`relative flex flex-col items-center justify-center p-5 
                cursor-pointer rounded-xl transition-all duration-200 border-2 transform hover:-translate-y-1 hover:shadow-xl
                ${
                  isSelected
                    ? "border-[#155DFC] bg-white shadow-sm"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300"
                }`}
            >
              {/* The Tick Mark */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#155DFC] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
              )}

              <Image
                src={item.image}
                width={50}
                height={50}
                alt={item.name}
                className="mb-3"
              />
              <h2 className="font-semibold text-gray-700">{item.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
