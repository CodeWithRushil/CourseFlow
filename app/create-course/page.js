"use client"
import React, { act, useContext, useState } from 'react'
import LogoHeader from './_components/LogoHeader'
import { v4 as uuidv4 } from 'uuid';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import Topic from './_components/Topic';
import Category from './_components/Category';
import Options from './_components/Options';
import { UserInputContext } from '../_context/UserInputContext';
import { generateCourseLayout_AI } from '@/configs/AiModel';
import Loading from './_components/Loading';
import LoadingComplete from './_components/LoadingComplete';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

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
    }
    else if (activeStep == 0 && (!userCourseInput?.category)) {
      return true;
    }
    else if (activeStep == 1 && (!userCourseInput?.topic || !userCourseInput?.description)) {
      return true;
    }
    else if (activeStep == 2 && (!userCourseInput?.level || !userCourseInput?.duration || !userCourseInput?.displayVideo || !userCourseInput?.chapters || userCourseInput?.chapters <= 0)) {
      return true;
    }
    return false;
  }
  const generateCourseLayout = async () => {
    setLoading(true);
    setLoadingComplete(false);
    const basicPrompt = "Generate A Course Tutorial on Following Detail with field as courseName, description, Along with chapterName, about, duration: category: ";
    const userPrompt = "category: " + userCourseInput.category + ", topic: " + userCourseInput.topic + ", level: " + userCourseInput.level + ", duration: " + userCourseInput.duration + ", noOfChapters: " + userCourseInput.chapters + ", in JSON format without ```json. Keep the keys as category, chapters, courseName, description, level, topic, duration. Keep in mind to keep the keys same to same and case sensitive. Also, when you give chapterName, just give the name only and not any numbering.";
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
  }
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
      courseBanner: '/placeholder.jpg',
      published: false
    }
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
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <LogoHeader />
      <main className="flex flex-col items-center px-6 py-10 sm:px-10 m-auto">
        <div className="w-4xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl text-center font-bold text-blue-600 mb-10">
            Create Course
          </h1>
          {/* Stepper */}
          <div className="flex items-start max-w-screen-lg mx-auto">
            {/* Step 1 */}
            <div className="w-full">
              <div className="flex items-center w-full">
                <div className="w-10 h-10 shrink-0 mx-[-1px] flex items-center justify-center rounded-full bg-blue-600 transition-all duration-500 ease-linear">
                  <span className="text-lg text-white font-semibold">
                    <MdOutlineCategory />
                  </span>
                </div>
                <div
                  className={`w-full h-[3px] mx-4 rounded-lg ${activeStep > 0 ? "bg-blue-600" : "bg-gray-300"
                    } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-2 mr-4">
                <h6 className="text-sm font-semibold text-blue-600 transition-all duration-500 ease-linear">
                  Category
                </h6>
              </div>
            </div>

            {/* Step 2 */}
            <div className="w-full">
              <div className="flex items-center w-full">
                <div
                  className={`w-10 h-10 shrink-0 mx-[-1px] ${activeStep > 0 ? "bg-blue-600" : "bg-gray-300"
                    } flex items-center justify-center rounded-full transition-all duration-500 ease-linear`}
                >
                  <span className="text-lg text-white font-semibold transition-all duration-500 ease-linear">
                    <FaRegLightbulb />
                  </span>
                </div>
                <div
                  className={`w-full h-[3px] mx-4 rounded-lg ${activeStep > 1 ? "bg-blue-600" : "bg-gray-300"
                    } transition-all duration-500 ease-linear`}
                ></div>
              </div>
              <div className="mt-2 mr-4">
                <h6
                  className={`text-sm font-semibold ${activeStep > 0 ? "text-blue-600" : "text-gray-300"
                    } transition-all duration-500 ease-linear`}
                >
                  Topic & Desc
                </h6>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 shrink-0 mx-[-1px] flex items-center justify-center rounded-full ${activeStep > 1 ? "bg-blue-600" : "bg-gray-300"
                    } transition-all duration-500 ease-linear`}
                >
                  <span
                    className={`text-lg font-semibold ${activeStep > 1 ? "text-white" : "text-gray-300"
                      } transition-all duration-500 ease-linear`}
                  >
                    <CgOptions />
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <h6
                  className={`text-sm font-semibold ${activeStep > 1 ? "text-blue-600" : "text-gray-300"
                    } transition-all duration-500 ease-linear`}
                >
                  Options
                </h6>
              </div>
            </div>
          </div>

          {/*Content */}
          {activeStep == 0 ? <Category /> : null}
          {activeStep == 1 ? <Topic /> : null}
          {activeStep == 2 ? <Options /> : null}

          {/*Next & Previous */}
          <div className="mt-25 flex justify-between">
            <Button onClick={handlePrev} disabled={activeStep == 0} className={`cursor-pointer ${activeStep == 0 ? "bg-gray-300 text-black" : "bg-blue-600"}`}>
              Prev
            </Button>
            <Button onClick={handleNext} disabled={checkStatus()} className={`cursor-pointer ${activeStep < 2 ? "bg-blue-600" : "hidden"} disabled:cursor-not-allowed disabled:opacity-50`}>
              Next
            </Button>
            <Button onClick={generateCourseLayout} disabled={checkStatus()} className={`cursor-pointer ${activeStep == 2 ? "bg-blue-600" : "hidden"}`}>
              Generate Course
            </Button>

          </div>
        </div>
      </main>
      <Loading loading={loading} />
      <LoadingComplete loadingComplete={loadingComplete} id={ID} />
    </div>
  )
}

export default CreateCourse
