import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return (
        <footer className="bg-[#eef4fd]">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" width={30} height={30} />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#02060d]">
                                CourseFlow
                            </span>
                        </Link>
                        <p className="mt-2 text-gray-800 text-sm mb-15 cursor-pointer">
                            Made by: Rushil Sharma
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-[#02060d]">
                                About
                            </h2>
                            <ul className="text-gray-800 font-medium">
                                <li className="mb-4">
                                    <Link href="/why-linkedink" className="hover:underline">
                                        Why CourseFlow
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us" className="hover:underline">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-[#02060d]">
                                Follow me
                            </h2>
                            <ul className="text-gray-800 font-medium">
                                <li className="mb-4">
                                    <a
                                        target="_blank"
                                        href="https://github.com/CodeWithRushil"
                                        className="hover:underline "
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://linkedin.com/in/CodeWithRushil"
                                        className="hover:underline"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-[#02060d]">
                                Legal
                            </h2>
                            <ul className="text-gray-800 font-medium">
                                <li className="mb-4">
                                    <Link href="/privacy-policy" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:underline">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-800 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-800 sm:text-center">
                        © {currentYear}{" "}
                        <Link href="/" className="hover:underline">
                            CourseFlow™
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 items-center">
                        <a
                            href="https://instagram.com/rushil.in"
                            className="text-gray-500 hover:text-white text-lg"
                            target="_blank"
                        >
                            <i className="ri-instagram-line" />
                            <span className="sr-only">Instagram Profile</span>
                        </a>
                        <a
                            href="https://reddit.com/u/CodeWithRuvian"
                            className="text-gray-500 hover:text-white ms-5 text-lg"
                            target="_blank"
                        >
                            <i className="ri-reddit-line" />
                            <span className="sr-only">Reddit Profile</span>
                        </a>
                        <a
                            href="https://x.com/CodeWithRushil"
                            className="text-gray-500 hover:text-white ms-5 text-lg"
                            target="_blank"
                        >
                            <i className="ri-twitter-x-line" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a
                            href="https://github.com/CodeWithRushil"
                            className="text-gray-500 hover:text-white ms-5 text-lg"
                            target="_blank"
                        >
                            <i className="ri-github-fill" />
                            <span className="sr-only">GitHub Account</span>
                        </a>
                        <a
                            href="https://linkedin.com/in/CodeWithRushil"
                            className="text-gray-500 hover:text-white ms-5 text-lg"
                            target="_blank"
                        >
                            <i className="ri-linkedin-fill" />
                            <span className="sr-only">LinkedIn Account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer