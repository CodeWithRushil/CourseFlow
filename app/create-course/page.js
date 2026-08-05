"use client";
import React, { useContext, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@material-tailwind/react";
import Topic from "./_components/Topic";
import Category from "./_components/Category";
import Options from "./_components/Options";
import { UserInputContext } from "../_context/UserInputContext";
import { generateCourseLayout as generateCourseLayoutAI } from "@/configs/AiModel";
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
    const chapterCount = Math.max(
      1,
      Math.min(12, Number(userCourseInput.chapters) || 5)
    );

    let success = false;
    while (!success) {
      try {
        const courseLayout = await generateCourseLayoutAI({
          category: userCourseInput.category,
          topic: userCourseInput.topic,
          description: userCourseInput.description,
          level: userCourseInput.level,
          duration: userCourseInput.duration,
          chapterCount,
        });
        console.log("✅ Course Layout Generated");
        await SaveCourseLayoutInDB(courseLayout);
        console.log("✅ Course Layout Saved in Database");
        success = true;
      } catch (err) {
        console.error("Error generating course:", err);
      }
    }
  };
  const SaveCourseLayoutInDB = async (courseLayout) => {
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
      // console.log("Saved to Database");
    } catch (err) {
      console.error("Error saving course:", err);
    }
    setLoading(false);
    router.replace("/create-course/" + id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const stepMarginTop = {
    0: "mt-14 sm:mt-22",
    1: "mt-35 sm:mt-15",
    2: "mt-12 sm:mt-20",
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ProfileHeader />

      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:px-10 mt-16 justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl text-center font-semibold text-slate-900 mb-10">
            Create Course
          </h1>

          {/* Stepper */}
          <div className="flex items-start justify-center w-full max-w-4xl mx-auto px-2">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className="flex-1 h-[3px] invisible"></div>

                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#155DFC] transition-all duration-500 ease-linear shadow-md z-10">
                  <span className="text-lg text-white font-semibold">
                    <MdOutlineCategory />
                  </span>
                </div>

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

      <Loading
        loading={loading}
        mode="layout"
        chapterCount={userCourseInput?.chapters || 3}
      />
    </div>
  );
};

export default CreateCourse;
