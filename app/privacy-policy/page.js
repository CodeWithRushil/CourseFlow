"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@clerk/nextjs";
import MainLoader from "@/components/MainLoader";

const sections = [
  {
    id: 1,
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly when using CourseFlow, such as your name, email address, and account details. We may also collect usage data related to how you interact with the platform to improve our services.",
  },
  {
    id: 2,
    title: "2. How We Use Your Information",
    content:
      "Your information is used to provide, maintain, and improve CourseFlow, personalize learning experiences, communicate important updates, and ensure platform security. We do not sell your personal data to third parties.",
  },
  {
    id: 3,
    title: "3. Data Storage & Security",
    content:
      "We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. While we strive to use commercially acceptable security practices, no system can be completely secure.",
  },
  {
    id: 4,
    title: "4. Cookies & Analytics",
    content:
      "CourseFlow may use cookies and similar technologies to enhance user experience, analyze platform usage, and improve performance. You can control cookie preferences through your browser settings.",
  },
  {
    id: 5,
    title: "5. Third-Party Services",
    content:
      "We may use trusted third-party services for authentication, analytics, and infrastructure. These services have access only to the information necessary to perform their functions and are obligated to protect your data.",
  },
  {
    id: 6,
    title: "6. Your Rights & Choices",
    content:
      "You have the right to access, update, or delete your personal information. If you have questions about your data or wish to exercise your rights, you may contact us through the platform.",
  },
];

const PrivacyPolicyPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "grid",
          placeItems: "center",
          backgroundColor: "#ffffff",
          zIndex: 9999,
        }}
      >
        <MainLoader />
      </div>
    );

  return (
    <>
      <Header
        text={isSignedIn ? "Dashboard" : "Home"}
        link={isSignedIn ? "dashboard" : ""}
        fallback={isSignedIn ? "dashboard" : ""}
      />

      <div className="min-h-screen bg-white pt-16 sm:pt-20">
        <div className="max-w-[680px] sm:max-w-screen-2xl mx-auto px-7 sm:px-6 py-10 sm:py-16">
          {/* TITLE */}
          <div className="mb-8 sm:mb-14 text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-semibold text-slate-900 mb-1">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Last updated: 15/01/2026
            </p>
          </div>

          {/* INTRO */}
          <p className="text-center sm:text-left text-sm sm:text-lg text-slate-600 leading-relaxed mb-10 sm:mb-16">
            Your privacy matters to{" "}
            <span className="font-semibold text-[#155DFC]">
              Course<span className="italic">Flow</span>
            </span>
            . This Privacy Policy explains how we collect, use, and protect your
            information when you use our platform.
          </p>

          {/* SECTIONS */}
          <div className="space-y-10 sm:space-y-16">
            {sections.map((section) => (
              <section key={section.id}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-blue-50 text-[#155DFC] rounded-md text-xs sm:text-sm mt-0.5">
                    {section.id}
                  </span>
                  <h2 className="text-base sm:text-xl font-semibold text-slate-900 leading-snug">
                    {section.title.split(". ")[1]}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed sm:pl-9">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
