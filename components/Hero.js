"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  // Scroll-driven animation for tilted hero image
  const { scrollY } = useScroll();

  const rotateX = useTransform(scrollY, [0, 300], [25, 0]);
  const translateY = useTransform(scrollY, [0, 300], [50, 0]);
  const scale = useTransform(scrollY, [0, 300], [0.95, 1]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#F8F8F8] text-center px-4 overflow-hidden">
      {/* === FLOATING CARDS CONTAINER === */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        {/* LEFT TOP */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[30%] bg-white/80 backdrop-blur-lg shadow-xl 
                     rounded-xl p-2 w-25 h-25 flex items-center justify-center rotate-110"
        >
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </motion.div>

        {/* LEFT BOTTOM */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[16%] top-[15%] bg-white/80 backdrop-blur-lg shadow-xl 
                     rounded-xl p-2 w-25 h-25 flex items-center justify-center rotate-70"
        >
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </motion.div>

        {/* RIGHT TOP */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[30%] bg-white/80 backdrop-blur-lg shadow-xl 
                     rounded-xl p-2 w-25 h-25 flex items-center justify-center rotate-110"
        >
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </motion.div>

        {/* RIGHT BOTTOM */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[16%] top-[15%] bg-white/80 backdrop-blur-lg shadow-xl 
                     rounded-xl p-2 w-25 h-25 flex items-center justify-center rotate-70"
        >
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        </motion.div>
      </div>

      {/* === HERO TEXT === */}
      <div className="max-w-3xl relative z-10">
        <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[#02060d] leading-tight">
          CourseFlow
        </h1>
        <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-[#02060d] leading-tight">
          AI Course Generator
        </h1>
        <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-[#02060d] leading-tight">
          Custom Learning Paths, Powered by AI
        </h1>

        <p className="mb-8 text-lg md:text-xl text-gray-700">
          Create structured, engaging courses in minutes — powered by AI.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 text-white bg-[#155DFC] rounded-lg 
                     hover:bg-blue-700 transition-all font-semibold shadow-md"
        >
          Get Started For Free
        </Link>
      </div>

      {/* === SCROLL TRANSFORM IMAGE === */}
      {/* === SCROLL TRANSFORM IMAGE (FIXED) === */}
      <motion.div
        style={{
          y: translateY,
          scale,
        }}
        className="mt-15 mb-30 w-full max-w-7xl perspective-2000 drop-shadow-2xl drop-shadow-blue-100"
      >
        <motion.div
          style={{
            rotateX,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/aly.avif"
            alt="CourseFlow Demo"
            width={1600}
            height={1200}
            className="w-full h-auto drop-shadow-xl rounded-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
