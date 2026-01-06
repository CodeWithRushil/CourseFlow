import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
const Header = ({ text, link }) => {
  return (
    <nav className="bg-[#FFFFFF] drop-shadow-sm fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Image
            src="/cf_logo4.svg"
            alt="Flowbite Logo"
            width={30}
            height={30}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#02060d]">
            CourseFlow
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
