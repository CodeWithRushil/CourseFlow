import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import DashboardBackButton from "@/components/DashboardBackButton";

const Header = () => {
  return (
    <nav className="bg-[#FFFFFF] border-b border-gray-200 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl 2xl:max-w-[1440px] 2xl:min-[1700px]:max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-3.5 py-3 lg:px-4">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <DashboardBackButton />
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <Link
            href="/dashboard"
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
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
