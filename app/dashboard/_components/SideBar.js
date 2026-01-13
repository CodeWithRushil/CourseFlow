"use client";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// Icons
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { FiEdit3, FiLogOut } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { HiMenuAlt2, HiX } from "react-icons/hi";

const SideBar = () => {
  const path = usePathname();
  const { signOut } = useClerk();
  const { isLoaded } = useUser();

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 pl-0 sm:pl-2">
              {/* Mobile Toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
              >
                {open ? <HiX size={22} /> : <HiMenuAlt2 size={22} />}
              </button>

              <Link href="/dashboard" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                <span className="text-2xl font-semibold text-[#02060d]">
                  Course<span className="italic">Flow</span>
                </span>
              </Link>
            </div>

            {isLoaded ? (
              <UserButton />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            )}
          </div>
        </div>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                  path === "/dashboard" && "bg-gray-100"
                }`}
              >
                <HiOutlineHome size={20} />
                <span className="ms-3">Home</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/explore"
                onClick={() => setOpen(false)}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                  path === "/dashboard/explore" && "bg-gray-100"
                }`}
              >
                <MdOutlineExplore size={20} />
                <span className="ms-3">Explore</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/unpublished-courses"
                onClick={() => setOpen(false)}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                  path === "/dashboard/unpublished-courses" && "bg-gray-100"
                }`}
              >
                <FiEdit3 size={20} />
                <span className="ms-3">Unpublished</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/delete-courses"
                onClick={() => setOpen(false)}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100"
              >
                <RiDeleteBin2Line size={20} />
                <span className="ms-3">Delete Courses</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => signOut()}
                className="w-full flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100"
              >
                <FiLogOut size={20} />
                <span className="ms-3 text-left">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
