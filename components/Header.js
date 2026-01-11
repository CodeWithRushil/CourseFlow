import React from "react";
import Image from "next/image";
import Link from "next/link";
const Header = ({ text, link, fallback="" }) => {
  return (
    <nav className="bg-[#FFFFFF] border-b border-gray-200 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl 2xl:max-w-[1440px] 2xl:min-[1700px]:max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/" + fallback}
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Image
            src="/logo.svg"
            alt="CourseFlow Logo"
            width={30}
            height={30}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#02060d]">
            Course<span className="italic">Flow</span>
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href={"/" + link}>
            <button
              type="button"
              className="text-white bg-[#155DFC] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 cursor-pointer"
            >
              {text}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
