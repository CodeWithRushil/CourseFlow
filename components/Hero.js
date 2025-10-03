import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-[#02060d]">
                CourseFlow
            </h1>
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-[#02060d]">
                AI Course Generator
            </h1>
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-[#02060d]">
                Custom Learning Paths, Powered by AI
            </h1>
            <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-[#02060d]">
                Course creation, reimagined — build structured, engaging courses in minutes with AI.
            </p>
            <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
                Get Started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Link>
        </div>
    )
}

export default Hero
