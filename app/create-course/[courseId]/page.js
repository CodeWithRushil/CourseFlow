"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import Chapters from './_components/Chapters';
import Loading from '../_components/Loading';
import { generateChapterContent_AI } from '@/configs/AiModel';
import youtube from '@/configs/youtube';
import { useRouter } from 'next/navigation';

const CourseLayout = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingAnimation, setLoadingAnimation] = useState(false);

    useEffect(() => {
        if (params?.courseId && user) {
            getCourseLayout();
        }
    }, [params, user]);

    const getCourseLayout = async () => {
        setLoading(true);
        const result = await fetch("/api/getCourseData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId: params.courseId,
                email: user?.primaryEmailAddress?.emailAddress
            }),
        });
        const data = await result.json();
        console.log("API response:", data);
        if (data.success) {
            setCourse(data.course);
        }
        setLoading(false);
    }

    const generateChapterContent = async () => {
        setLoadingAnimation(true);
        const chapters = course.courseOutput.chapters;
        const results = [];
        for (let i = 0; i < chapters.length; i++) {
            const chapter = chapters[i];
            const PROMPT = " Explain the concept in Detail on Topic without ```json: " + course.name + "," + "Chapter: " + chapter.chapterName + "," +
                "in JSON Format without ```json with an array of objects having fields: title, explanation, and code (if applicable) without ```json.";

            try {
                const result = await generateChapterContent_AI(PROMPT);
                const chapterContent = JSON.parse(result);
                console.log(`✅ Chapter ${i + 1}:`, chapterContent);
                const rawVideo = await youtube.getVideos(course.name + ":" + chapter.chapterName);
                console.log(`✅✅ Video ${i + 1}:`, rawVideo);
                await SaveChapterInDB(chapter.chapterName, chapterContent, i, rawVideo[0].id.videoId);
            } catch (err) {
                console.error(`⚠️ Error on chapter ${i + 1}:`, err);
            }
        };
        try {
            const updatedCourse = { ...course, published: true };
            setCourse(updatedCourse);
            const res = await fetch("/api/updateCourseLayout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCourse),
            });
            const data = await res.json();
            console.log("Updated in Database: ", data);
        } catch (err) {
            console.error("Error updating course:", err);
        }
        setLoadingAnimation(false);
        router.replace("/create-course/" + course.courseId + "/finish");
    }

    const SaveChapterInDB = async (chapterInfo, chapterData, i, videoId) => {
        const payload = {
            courseId: course.courseId,
            chapterInfo: chapterInfo,
            chapterId: i,
            content: chapterData,
            videoId: videoId
        }
        try {
            const res = await fetch("/api/saveChapterContent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            console.log(`Saved Chapter ${i + 1} to Database`);
        } catch (err) {
            console.error(`Error saving chapter ${i + 1}:`, err);
        }
        // setLoading(false);
        // setLoadingComplete(true);
        // router.replace('/visit-course/' + id);
    }
    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
            {loading ? (
                <p>Loading course information...</p>
            ) : course && course.courseOutput ? (
                <>
                    <CourseBasicInfo course={course} refreshData={() => getCourseLayout()} />
                    <CourseDetail course={course} />
                    <Chapters course={course} refreshData={() => getCourseLayout()} />
                    <button className="mt-5 mb-10 cursor-pointer focus:outline-none text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 font-semibold" onClick={generateChapterContent}>Generate Course Content</button>
                </>
            ) : (
                <p>No course data found.</p>
            )}
            <Loading loading={loadingAnimation} />
        </div>
    )
}

export default CourseLayout;
