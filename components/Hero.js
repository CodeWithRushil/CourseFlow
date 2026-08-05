"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { RiRobot3Line, RiFlowChart } from "react-icons/ri";
import { LuBrainCircuit, LuBookText } from "react-icons/lu";

const floatingItems = [
  {
    id: "robot",
    Icon: RiRobot3Line,
    className:
      "left-[2%] top-[22%] sm:left-[3%] sm:top-[26%] md:left-[2%] xl:left-[8%] md:top-[30%] rotate-12",
    float: { y: [0, -12, 0], rotate: [12, 8, 12] },
    duration: 3.2,
    delay: 0,
  },
  {
    id: "brain",
    Icon: LuBrainCircuit,
    className:
      "left-[4%] top-[10%] sm:left-[8%] sm:top-[12%] md:left-[5%] xl:left-[14%] md:top-[15%] -rotate-12",
    float: { y: [0, 14, 0], rotate: [-12, -7, -12] },
    duration: 3.6,
    delay: 0.35,
  },
  {
    id: "flow",
    Icon: RiFlowChart,
    className:
      "right-[2%] top-[22%] sm:right-[3%] sm:top-[26%] md:right-[2%] xl:right-[8%] md:top-[30%] -rotate-12",
    float: { y: [0, -14, 0], rotate: [-12, -16, -12] },
    duration: 3.1,
    delay: 0.15,
  },
  {
    id: "book",
    Icon: LuBookText,
    className:
      "right-[4%] top-[10%] sm:right-[8%] sm:top-[12%] md:right-[5%] xl:right-[14%] md:top-[15%] rotate-12",
    float: { y: [0, 12, 0], rotate: [12, 16, 12] },
    duration: 3.8,
    delay: 0.5,
  },
];

const Hero = () => {
  const { isSignedIn, isLoaded } = useUser();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const rotateXRaw = useTransform(scrollY, [0, 420], [32, 0]);
  const translateYRaw = useTransform(scrollY, [0, 420], [90, 0]);
  const scaleRaw = useTransform(scrollY, [0, 420], [0.86, 1]);
  const shadowRaw = useTransform(
    scrollY,
    [0, 420],
    [
      "0 25px 50px -20px rgba(21,93,252,0.18)",
      "0 18px 40px -18px rgba(15,23,42,0.16)",
    ]
  );

  const springConfig = { stiffness: 90, damping: 22, mass: 0.55 };
  const rotateX = useSpring(rotateXRaw, springConfig);
  const translateY = useSpring(translateYRaw, springConfig);
  const scale = useSpring(scaleRaw, springConfig);

  const ctaLabel =
    isLoaded && isSignedIn ? "Go to Dashboard" : "Get Started For Free";

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen bg-white text-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingItems.map(({ id, Icon, className, float, duration, delay }) => (
          <motion.div
            key={id}
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, scale: 0.7, y: 24 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: float.y,
                    rotate: float.rotate,
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.2 }
                : {
                    opacity: { duration: 0.55, delay: 0.2 + delay },
                    scale: {
                      type: "spring",
                      stiffness: 160,
                      damping: 16,
                      delay: 0.2 + delay,
                    },
                    y: {
                      duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6 + delay,
                    },
                    rotate: {
                      duration: duration + 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6 + delay,
                    },
                  }
            }
            className={`absolute
              bg-white/85 backdrop-blur-lg shadow-lg sm:shadow-xl rounded-xl p-1.5 sm:p-2
              w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24
              flex items-center justify-center
              ${className}`}
          >
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center shadow-inner">
              <Icon className="text-xl sm:text-3xl md:text-4xl xl:text-5xl text-[#155DFC]" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl relative z-10 mt-16 sm:mt-24 md:mt-30 px-8 sm:px-12 md:px-0">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#02060d] tracking-tight mb-4">
            Course<span className="italic">Flow</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6">
            Custom Learning Paths{" "}
            <span className="block text-[#155DFC]">Powered by AI</span>
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Create structured, engaging courses in minutes. Stop searching and
            start learning with personalized curriculums.
          </p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base
                 text-white bg-[#155DFC] rounded-lg hover:bg-blue-700
                 transition-all font-semibold shadow-md active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile only: float like the 4 option cards + extra gap under CTA */}
      <motion.div
        className="md:hidden mt-20 mb-20 w-full max-w-7xl px-2 relative z-10"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [0, -10, 0] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : {
                opacity: { duration: 0.6, delay: 0.25 },
                y: {
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                },
              }
        }
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

      {/* Desktop: scroll settle animation */}
      <motion.div
        className="hidden md:block mt-12 mb-24 w-full max-w-7xl perspective-[2000px] px-6 relative z-10"
        initial={
          prefersReducedMotion ? false : { opacity: 0, y: 48, scale: 0.92 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.85,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={
          prefersReducedMotion
            ? undefined
            : {
                y: translateY,
                scale,
              }
        }
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : {
                  rotateX,
                  transformStyle: "preserve-3d",
                  boxShadow: shadowRaw,
                }
          }
          className="rounded-xl overflow-hidden will-change-transform"
        >
          <Image
            src="/main.png"
            alt="CourseFlow Demo"
            width={1600}
            height={1200}
            className="w-full h-auto rounded-xl"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
