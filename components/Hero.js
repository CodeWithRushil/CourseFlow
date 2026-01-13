"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RiRobot3Line, RiFlowChart } from "react-icons/ri";
import { LuBrainCircuit, LuBookText } from "react-icons/lu";
const Hero = () => {
  const { scrollY } = useScroll();

  const rotateX = useTransform(scrollY, [0, 300], [25, 0]);
  const translateY = useTransform(scrollY, [0, 300], [50, 0]);
  const scale = useTransform(scrollY, [0, 300], [0.95, 1]);

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen bg-white text-center px-4 pt-20 overflow-hidden">
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[2%] xl:left-[8%] top-[30%]
                   bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-2
                   w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center
                   rotate-12"
        >
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center shadow-inner">
            <RiRobot3Line className="text-4xl xl:text-5xl text-[#155DFC]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] xl:left-[14%] top-[15%]
                   bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-2
                   w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center
                   -rotate-12"
        >
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center shadow-inner">
            <LuBrainCircuit className="text-4xl xl:text-5xl text-[#155DFC]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[2%] xl:right-[8%] top-[30%]
                   bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-2
                   w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center
                   -rotate-12"
        >
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center shadow-inner">
            <RiFlowChart className="text-4xl xl:text-5xl text-[#155DFC]" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] xl:right-[14%] top-[15%]
                   bg-white/80 backdrop-blur-lg shadow-xl rounded-xl p-2
                   w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center
                   rotate-12"
        >
          <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center shadow-inner">
            <LuBookText className="text-4xl xl:text-5xl text-[#155DFC]" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl relative z-10 mt-14 sm:mt-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#02060d] tracking-tight mb-4">
            Course<span className="italic">Flow</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6">
            Custom Learning Paths{" "}
            <span className="block text-[#155DFC]">Powered by AI</span>
          </h2>
          <p className="max-w-xl mx-auto md:mx-0 mb-8 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Create structured, engaging courses in minutes. Stop searching and
            start learning with personalized curriculums.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base
                 text-white bg-[#155DFC] rounded-lg hover:bg-blue-700
                 transition-all font-semibold shadow-md"
          >
            Get Started For Free
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }} // slight delay feels nice
        style={{
          y: translateY,
          scale,
        }}
        className="mt-8 sm:mt-12 mb-24 w-full max-w-7xl perspective-[2000px]
             drop-shadow-2xl drop-shadow-blue-100 px-4 sm:px-6"
      >
        <motion.div
          style={{
            rotateX,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/main.png"
            alt="CourseFlow Demo"
            width={1600}
            height={1200}
            className="w-full h-auto rounded-xl drop-shadow-xl"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
