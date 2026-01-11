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
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { MdOutlineCategory } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { CgOptions } from "react-icons/cg";
import { RiGeminiFill } from "react-icons/ri";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

const CreateCourse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const [loading, setLoading] = useState(false);
  // const [loadingComplete, setLoadingComplete] = useState(false);
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
    // setLoadingComplete(false);
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
    // setLoadingComplete(true);
    router.replace("/create-course/" + id);
  };
  const stepMarginTop = {
    0: "mt-14 sm:mt-22",
    1: "mt-35 sm:mt-15",
    2: "mt-12 sm:mt-20",
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ProfileHeader />

      {/* MAIN WRAPPER 
        1. Added pt-24 (96px) to clear the fixed header. 
        2. flex-1 ensures the footer (if any) stays at the bottom.
      */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:px-10 mt-16 justify-center">
        {/* CARD CONTAINER
          1. Changed w-4xl to w-full max-w-4xl for mobile responsiveness.
          2. Adjusted padding for mobile (p-6) vs desktop (p-10).
        */}
        <div className="w-full max-w-4xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl text-center font-semibold text-slate-900 mb-10">
            Create Course
          </h1>

          {/* Stepper - Max-w increased to make lines longer */}
          <div className="flex items-start justify-center w-full max-w-4xl mx-auto px-2">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* Spacer to keep icon centered */}
                <div className="flex-1 h-[3px] invisible"></div>

                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#155DFC] transition-all duration-500 ease-linear shadow-md z-10">
                  <span className="text-lg text-white font-semibold">
                    <MdOutlineCategory />
                  </span>
                </div>

                {/* Connecting Line 1 */}
                <div
                  className={`flex-1 h-[3px] -mx-[1px] ${
                    activeStep > 0 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-3 text-center">
                <h6 className="text-xs sm:text-sm font-semibold text-[#155DFC]">
                  Category
                </h6>
                <p className="text-[10px] sm:text-xs text-gray-500">Step 1</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* Connecting Line 1 (Left Side) */}
                <div
                  className={`flex-1 h-[3px] -mx-[1px] ${
                    activeStep > 0 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>

                <div
                  className={`w-10 h-10 shrink-0 z-10 ${
                    activeStep > 0 ? "bg-[#155DFC]" : "bg-gray-300"
                  } flex items-center justify-center rounded-full transition-all duration-500 ease-linear shadow-md`}
                >
                  <span className="text-lg text-white font-semibold">
                    <FaRegLightbulb />
                  </span>
                </div>

                {/* Connecting Line 2 (Right Side) */}
                <div
                  className={`flex-1 h-[3px] -mx-[1px] ${
                    activeStep > 1 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-3 text-center">
                <h6
                  className={`text-xs sm:text-sm font-semibold ${
                    activeStep > 0 ? "text-[#155DFC]" : "text-gray-300"
                  }`}
                >
                  Topic
                </h6>
                <p className="text-[10px] sm:text-xs text-gray-500">Step 2</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {/* Connecting Line 2 */}
                <div
                  className={`flex-1 h-[3px] -mx-[1px] ${
                    activeStep > 1 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear`}
                ></div>

                <div
                  className={`w-10 h-10 shrink-0 z-10 flex items-center justify-center rounded-full ${
                    activeStep > 1 ? "bg-[#155DFC]" : "bg-gray-300"
                  } transition-all duration-500 ease-linear shadow-md`}
                >
                  <span className="text-lg text-white font-semibold">
                    <CgOptions />
                  </span>
                </div>

                {/* Spacer to keep icon centered */}
                <div className="flex-1 h-[3px] invisible"></div>
              </div>
              <div className="mt-3 text-center">
                <h6
                  className={`text-xs sm:text-sm font-semibold ${
                    activeStep > 1 ? "text-[#155DFC]" : "text-gray-300"
                  }`}
                >
                  Options
                </h6>
                <p className="text-[10px] sm:text-xs text-gray-500">Step 3</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="mt-10">
            {activeStep === 0 && <Category />}
            {activeStep === 1 && <Topic />}
            {activeStep === 2 && <Options />}
          </div>

          {/* Next & Previous */}
          <div
            className={`flex flex-col sm:flex-row justify-between gap-4 ${stepMarginTop[activeStep]}`}
          >
            <Button
              onClick={handlePrev}
              disabled={activeStep === 0}
              variant="outline"
              className={`flex items-center justify-center gap-2 normal-case text-sm font-medium px-4 py-1.5 rounded-md transition-all 
      ${
        activeStep === 0
          ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200"
          : "bg-white text-[#155DFC] border-2 cursor-pointer border-[#155DFC] hover:bg-blue-50 active:bg-blue-100"
      } 
      sm:order-1 order-2`}
            >
              <BiSolidLeftArrow size={12} /> Back
            </Button>

            {activeStep < 2 ? (
              <Button
                onClick={handleNext}
                disabled={checkStatus()}
                className="flex items-center justify-center gap-2 normal-case cursor-pointer text-sm font-medium px-4 py-1.75 bg-[#155DFC] text-white rounded-md 
        hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed 
        sm:order-2 order-1"
              >
                Next <BiSolidRightArrow size={12} />
              </Button>
            ) : (
              <Button
                onClick={generateCourseLayout}
                disabled={checkStatus()}
                className="flex items-center gap-2 justify-center normal-case cursor-pointer text-sm font-medium px-4 py-1.75 bg-[#155DFC] text-white rounded-md 
        hover:bg-blue-700 active:scale-95 disabled:opacity-50 
        sm:order-2 order-1"
              >
                <RiGeminiFill /> Generate Course
              </Button>
            )}
          </div>
        </div>
      </main>

      <Loading loading={loading} mode="layout" />
    </div>
  );
};

export default CreateCourse;
