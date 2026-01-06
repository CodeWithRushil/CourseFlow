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

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  return (
    <>
      <h1 className="mt-10 mb-5 text-center sm:text-left">
        Select the Course Category
      </h1>

      <div className="grid grid-cols-2 sm:flex sm:justify-evenly gap-4 sm:gap-6">
        {CategoryList.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryChange(item.name)}
            className={`border border-black cursor-pointer h-32 w-full sm:w-60 gap-3
        text-center flex flex-col items-center justify-center rounded-2xl transition-all
        ${
          userCourseInput.category === item.name
            ? "bg-blue-200 text-black"
            : "bg-gray-50 hover:bg-blue-100 hover:text-black"
        }`}
          >
            <Image src={item.image} width={50} height={50} alt={item.name} />
            <h2 className="font-medium">{item.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
