"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

const StartCourse = ({ params }) => {
    const { user } = useUser();
    const [course, setCourse] = useState({});
    const [selectedChapterContent, setSelectedChapterContent]=useState({});
    const [selectedChapter, setSelectedChapter]=useState();

    useEffect(() => {
        if (user) {
            getCourse();
        }
    }, [user])

    const getCourse = async () => {
        const result = await fetch("/api/getCourseData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId: params.courseId,
                email: user?.primaryEmailAddress?.emailAddress
            }),
        });
        const data = await result.json();
        console.log("Start Course:", data);
        if (data.success) {
            setCourse(data.course);
        }
    }

    const getSelectedChapterContent=async (index)=>{
        const result = await fetch("/api/getChapterContent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId: course.courseId,
                chapterId: index
            }),
        });
        const data = await result.json();
        console.log("Selected Chapter Content:", data);
        if (data.success) {
            setSelectedChapterContent(data.chapter);
            console.log(data.chapter);
        }

    }

    if (!course || !course.courseOutput) return <div>Loading...</div>;

    return (
        <div>
            {/* 1 */}
            <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-purple-600 text-white p-4'>{course?.courseOutput?.courseName}</h2>

                <div>
                    {course?.courseOutput?.chapters.map((chapter, index) => (
                        <div key={index} className={`cursor-pointer hover:bg-purple-50 
                        ${selectedChapter?.chapterName==chapter?.chapterName && 'bg-purple-100'}`} onClick={()=>{setSelectedChapter(chapter); getSelectedChapterContent(index);}}>
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                        
                    ))}
                </div>
            </div>

            {/* 2 */}
            <div className='md:ml-72'>
                <ChapterContent chapter={selectedChapter} content={selectedChapterContent} />
            </div>
        </div>

    )
}

export default StartCourse