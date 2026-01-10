"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      {/* Login Page */}
      <Header text="Sign Up" link="sign-up" />
      <div className="min-h-screen bg-[#F8F8F8] text-[#02060D]">
        <main className="min-h-screen flex items-center justify-center px-4 pt-20">
          <SignIn
            appearance={{
              elements: {
                card: "border border-gray-200 rounded-xl !shadow-none",
                cardBox: "!shadow-sm !border !border-gray-200",
                rootBox: "w-full max-w-md",
                header: "pb-4",
                headerTitle: "text-lg font-semibold",
                headerSubtitle: "text-gray-500 text-sm",
                form: "gap-4",
                formButtonPrimary:
                  "bg-[#155DFC] hover:bg-blue-700 text-sm font-medium",
                socialButtonsBlockButton:
                  "border border-gray-200 hover:bg-gray-100",
                footerActionText: "text-sm",
              },
              variables: {
                spacingUnit: "1rem",
                borderRadius: "0.35rem",
              },
              layout: {
                socialButtonsPlacement: "bottom",
              },
            }}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
