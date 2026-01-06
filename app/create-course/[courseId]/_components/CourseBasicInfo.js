"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditCourseInfo from "./EditCourseInfo";
import { Client, Storage, ID } from "appwrite";
import Link from "next/link";
import { MdOutlineCategory } from "react-icons/md";

const CourseBasicInfo = ({
  course,
  refreshData,
  edit = true,
  generateChapterContent,
}) => {
  console.log("Course received:", course);
  const onFileSelected = async (event) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    const storage = new Storage(client);
    const file = event.target.files[0];
    try {
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
      console.log("File uploaded Appwrite:", response);
      const fileId = response.$id;
      const downloadUrl = storage.getFileDownload(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        fileId
      );
      console.log("Download URL Appwrite: ", downloadUrl);
      course.courseBanner = downloadUrl;
      try {
        const res = await fetch("/api/updateCourseLayout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(course),
        });
        const data = await res.json();
        console.log("Updated Banner in Database: ", data);
        refreshData(true);
      } catch (err) {
        console.error("Error updating course banner:", err);
      }
    } catch (error) {
      console.error("Upload error Appwrite:", error);
    }
  };

  if (!course.courseOutput) {
    return (
      <div className="p-10 rounded-xl border shadow-sm mt-5">
        <p className="text-gray-500">Loading course info...</p>
      </div>
    );
  }
  return (
    <>
      <div className="p-6 md:p-10 rounded-xl border mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <h2 className="flex items-center gap-2 font-bold text-xl md:text-2xl">
              {course.courseOutput.courseName}
              {edit && (
                <EditCourseInfo
                  course={course}
                  refreshData={() => refreshData(true)}
                />
              )}
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed">
              {course.courseOutput.description}
            </p>

            <div className="flex items-center gap-2 text-[#155DFC] font-semibold">
              <MdOutlineCategory className="text-xl" />
              {course.courseOutput.category}
            </div>

            {!edit && (
              <Link href={`/course/${course.courseId}/start`}>
                <button className="w-full mt-2 px-6 py-2 rounded-lg bg-[#155DFC] text-white font-semibold hover:bg-blue-800 cursor-pointer transition">
                  Start
                </button>
              </Link>
            )}

            {edit && (
              <button
                onClick={generateChapterContent}
                className="w-full md:w-auto mt-2 px-6 py-2.5 rounded-lg bg-[#155DFC] text-white font-semibold hover:bg-blue-800 cursor-pointer transition"
              >
                Generate Course Content
              </button>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full order-1 md:order-2">
            <label htmlFor="upload-image" className="block cursor-pointer">
              <Image
                src={course.courseBanner}
                alt="Course Image"
                width={600}
                height={400}
                className="w-full h-56 md:h-[250px] object-cover rounded-xl"
              />
            </label>
            <input
              type="file"
              id="upload-image"
              className="hidden"
              onChange={onFileSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBasicInfo;
