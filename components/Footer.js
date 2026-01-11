import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill, RiRedditLine } from "react-icons/ri";
const Footer = () => {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  return (
    <footer className="bg-[#FFFFFF] border-t border-gray-200 z-21">
      <div className="mx-auto w-full max-w-screen-xl 2xl:max-w-[1440px] 2xl:min-[1700px]:max-w-screen-2xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="CourseFlow Logo"
                className="h-8 me-2"
                width={30}
                height={30}
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#02060d]">
                Course<span className="italic">Flow</span>
              </span>
            </Link>
            <p className="mt-2 text-gray-800 text-sm mb-15 cursor-pointer">
              Developer: Rushil Sharma
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-xl font-semibold text-[#02060d]">
                About
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 hover:underline">
                  <Link href="/why-linkedink">Why CourseFlow</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/about-us">About Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold text-[#02060d]">
                Follow me
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 hover:underline">
                  <a target="_blank" href="https://github.com/CodeWithRushil">
                    Github
                  </a>
                </li>
                <li className="hover:underline">
                  <a
                    target="_blank"
                    href="https://linkedin.com/in/CodeWithRushil"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xl font-semibold text-[#02060d]">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4 hover:underline">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/terms">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-black sm:text-center">
            © {currentYear} <Link href="/">CourseFlow™</Link>. All Rights
            Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 items-center">
            <a
              href="https://instagram.com/rushil.in"
              className="text-gray-500 hover:text-slate-900 text-lg"
              target="_blank"
            >
              <FaInstagram />
              <span className="sr-only">Instagram Profile</span>
            </a>
            <a
              href="https://reddit.com/u/CodeWithRuvian"
              className="text-gray-500 hover:text-slate-900 ms-5 text-lg"
              target="_blank"
            >
              <RiRedditLine />
              <span className="sr-only">Reddit Profile</span>
            </a>
            <a
              href="https://x.com/CodeWithRushil"
              className="text-gray-500 hover:text-slate-900 ms-5 text-lg"
              target="_blank"
            >
              <RiTwitterXFill />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="https://github.com/CodeWithRushil"
              className="text-gray-500 hover:text-slate-900 ms-5 text-lg"
              target="_blank"
            >
              <FaGithub />
              <span className="sr-only">GitHub Account</span>
            </a>
            <a
              href="https://linkedin.com/in/CodeWithRushil"
              className="text-gray-500 hover:text-slate-900 ms-5 text-lg"
              target="_blank"
            >
              <FaLinkedinIn />
              <span className="sr-only">LinkedIn Account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
