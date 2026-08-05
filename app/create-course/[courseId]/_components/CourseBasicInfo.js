"use client";
import Image from "next/image";
import React, { useState } from "react";
import EditCourseInfo from "./EditCourseInfo";
import { Client, Storage, ID } from "appwrite";
import Link from "next/link";
import { MdOutlineCategory } from "react-icons/md";
import { RiGeminiFill } from "react-icons/ri";
import { IoIosPlay } from "react-icons/io";
import { ImagePlus, ImageUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const CourseBasicInfo = ({
  course,
  refreshData,
  edit = true,
  generateChapterContent,
}) => {
  const { user } = useUser();
  const isCreator = user?.primaryEmailAddress?.emailAddress === course.createdBy;
  const [uploading, setUploading] = useState(false);

  const hasCustomBanner =
    Boolean(course.courseBanner) && course.courseBanner !== "/placeholder.jpg";

  const onFileSelected = async (event) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const storage = new Storage(client);
    const file = event.target.files[0];

    if (!file) return;

    const isUpdate = hasCustomBanner;
    const toastId = toast.loading(
      isUpdate ? "Updating image..." : "Uploading image..."
    );

    try {
      setUploading(true);
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );

      const fileId = response.$id;
      const downloadUrl = storage.getFileDownload(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        fileId
      );

      course.courseBanner = downloadUrl;

      await fetch("/api/updateCourseLayout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      refreshData(true);
      toast.success(isUpdate ? "Image updated" : "Image uploaded", {
        id: toastId,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setUploading(false);
      if (event.target) event.target.value = "";
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
        <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-8 md:gap-10">
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
                <button className="w-full flex items-center justify-center gap-1 mt-2 px-6 py-2 rounded-lg bg-[#155DFC] text-white font-semibold hover:bg-blue-700 cursor-pointer transition text-sm md:text-base">
                  <IoIosPlay size={18} /> Start
                </button>
              </Link>
            )}

            {edit && (
              <button
                onClick={generateChapterContent}
                className="w-full flex items-center justify-center gap-2 md:w-auto mt-2 px-6 py-2.5 rounded-lg bg-[#155DFC] text-white font-semibold hover:bg-blue-700 cursor-pointer transition text-sm md:text-base"
              >
                <RiGeminiFill /> Generate Course Content
              </button>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full order-1 md:order-2">
            {isCreator ? (
              <label
                htmlFor="upload-image"
                className={`group relative block cursor-pointer overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md ${
                  uploading ? "pointer-events-none opacity-70" : ""
                }`}
              >
                <Image
                  src={course.courseBanner || "/placeholder.jpg"}
                  alt="Course Image"
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover rounded-xl"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm">
                    {hasCustomBanner ? (
                      <ImageUp size={16} className="text-[#155DFC]" />
                    ) : (
                      <ImagePlus size={16} className="text-[#155DFC]" />
                    )}
                    {hasCustomBanner ? "Update image" : "Upload image"}
                  </span>
                </div>
              </label>
            ) : (
              <Image
                src={course.courseBanner || "/placeholder.jpg"}
                alt="Course Image"
                width={600}
                height={400}
                className="w-full h-56 object-cover rounded-xl border border-slate-200"
              />
            )}

            {isCreator && (
              <input
                type="file"
                id="upload-image"
                className="hidden"
                accept="image/*"
                disabled={uploading}
                onChange={onFileSelected}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseBasicInfo;
