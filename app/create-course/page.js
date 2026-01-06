"use client";
import React, { act, useContext, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import { v4 as uuidv4 } from "uuid";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import Topic from "./_components/Topic";
import Category from "./_components/Category";
import Options from "./_components/Options";
import { UserInputContext } from "../_context/UserInputContext";
import { generateCourseLayout_AI } from "@/configs/AiModel2";
import Loading from "./_components/Loading";
import LoadingComplete from "./_components/LoadingComplete";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { MdOutlineCategory } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";

const CreateCourse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [ID, setID] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    } else if (activeStep == 0 && !userCourseInput?.category) {
      return true;
    } else if (
      activeStep == 1 &&
      (!userCourseInput?.topic || !userCourseInput?.description)
    ) {
      return true;
    } else if (
      activeStep == 2 &&
      (!userCourseInput?.level ||
        !userCourseInput?.duration ||
        !userCourseInput?.displayVideo ||
        !userCourseInput?.chapters ||
        userCourseInput?.chapters <= 0)
    ) {
      return true;
    }
    return false;
  };
  const generateCourseLayout = async () => {
    setLoading(true);
    setLoadingComplete(false);
    const basicPrompt =
      "Generate A Course Tutorial on Following Detail with field as courseName, description, Along with chapterName, about, duration: category: ";
    const userPrompt =
      "category: " +
      userCourseInput.category +
      ", topic: " +
      userCourseInput.topic +
      ", level: " +
      userCourseInput.level +
      ", duration: " +
      userCourseInput.duration +
      ", noOfChapters: " +
      userCourseInput.chapters +
      ", in JSON format without ```json. Keep the keys as category, chapters, courseName, description, level, topic, duration. Keep in mind to keep the keys same to same and case sensitive. Also, when you give chapterName, just give the name only and not any numbering.";
    const finalPrompt = basicPrompt + userPrompt;
    let result;
    try {
      result = await generateCourseLayout_AI(finalPrompt);
      console.log(JSON.parse(result));
    } catch (err) {
      console.error("Error generating course:", err);
    }
    // setLoading(false);
    SaveCourseLayoutInDB(JSON.parse(result));
  };
  const SaveCourseLayoutInDB = async (courseLayout) => {
    // setLoading(true);
    //setLoadingComplete(false);
    var id = uuidv4();
    setID(id);
    const payload = {
      courseId: id,
      name: userCourseInput?.topic,
      category: userCourseInput?.category,
      level: userCourseInput?.level,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      userProfileImage: user?.imageUrl,
      includeVideo: userCourseInput?.displayVideo,
      courseBanner: "/placeholder.jpg",
      published: false,
    };
    try {
      const res = await fetch("/api/saveCourseLayout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Saved to Database");
    } catch (err) {
      console.error("Error saving course:", err);
    }
    setLoading(false);
    setLoadingComplete(true);
    // router.replace('/visit-course/' + id);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ProfileHeader />

      {/* MAIN WRAPPER 
        1. Added pt-24 (96px) to clear the fixed header. 
        2. flex-1 ensures the footer (if any) stays at the bottom.
      */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:px-10 pt-24">
        {/* CARD CONTAINER
          1. Changed w-4xl to w-full max-w-4xl for mobile responsiveness.
          2. Adjusted padding for mobile (p-6) vs desktop (p-10).
        */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-[#155DFC] mb-10">
            Create Course
          </h1>

          {/* Stepper - Structure untouched as requested */}
          <div className="flex items-start max-w-screen-lg mx-auto">
            {/* Step 1 */}
            <div className="w-full">
              <div className="flex items-center w-full">
                <div className="w-10 h-10 shrink-0 mx-[-1px] flex items-center justify-center rounded-full bg-[#155DFC] transition-all duration-500 ease-linear">
                  <span className="text-lg text-white font-semibold">
                    <MdOutlineCategory />
                  </span>
                </div>
                <div
                  className={`w-full h-[3px] mx-4 rounded-lg ${
                    activeStep > 0 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-2 mr-4">
                <h6 className="text-sm font-semibold text-[#155DFC] transition-all duration-500 ease-linear">
                  Category
                </h6>
                <p className="text-xs text-gray-500"> Step 1</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="w-full">
              <div className="flex items-center w-full">
                <div
                  className={`w-10 h-10 shrink-0 mx-[-1px] ${
                    activeStep > 0 ? "bg-[#155DFC]" : "bg-gray-300"
                  } flex items-center justify-center rounded-full transition-all duration-500 ease-linear`}
                >
                  <span className="text-lg text-white font-semibold transition-all duration-500 ease-linear">
                    <FaRegLightbulb />
                  </span>
                </div>
                <div
                  className={`w-full h-[3px] mx-4 rounded-lg ${
                    activeStep > 1 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-2 mr-4">
                <h6
                  className={`text-sm font-semibold ${
                    activeStep > 0 ? "text-[#155DFC]" : "text-gray-300"
                  } transition-all duration-500 ease-linear`}
                >
                  Topic
                </h6>
                <p className="text-xs text-gray-500">Step 2</p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 shrink-0 mx-[-1px] flex items-center justify-center rounded-full ${
                    activeStep > 1 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                >
                  <span className="text-lg text-white font-semibold transition-all duration-500 ease-linear">
                    <CgOptions />
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <h6
                  className={`text-sm font-semibold ${
                    activeStep > 1 ? "text-[#155DFC]" : "text-gray-300"
                  } transition-all duration-500 ease-linear`}
                >
                  Options
                </h6>
                <p className="text-xs text-gray-500">Step 3</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-10">
            {activeStep === 0 && <Category />}
            {activeStep === 1 && <Topic />}
            {activeStep === 2 && <Options />}
          </div>

          {/* Next & Previous - Added gap-4 for mobile spacing */}
          <div className="mt-16 sm:mt-24 flex justify-between gap-4">
            <Button
              onClick={handlePrev}
              disabled={activeStep === 0}
              className={`cursor-pointer px-6 py-2 rounded-md transition-all ${
                activeStep === 0
                  ? "bg-gray-300 text-black"
                  : "bg-[#155DFC] text-white"
              }`}
            >
              Back
            </Button>

            {activeStep < 2 ? (
              <Button
                onClick={handleNext}
                disabled={checkStatus()}
                className="cursor-pointer px-6 py-2 bg-[#155DFC] text-white rounded-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={generateCourseLayout}
                disabled={checkStatus()}
                className="cursor-pointer px-6 py-2 bg-[#155DFC] text-white rounded-md disabled:opacity-50"
              >
                Generate Course
              </Button>
            )}
          </div>
        </div>
      </main>

      <Loading loading={loading} />
      <LoadingComplete loadingComplete={loadingComplete} id={ID} />
    </div>
  );
};

export default CreateCourse;
