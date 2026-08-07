import React from "react";
import SideBar from "./_components/SideBar";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <SideBar />
      <div className="sm:ml-64 pt-16">
        <main className="min-h-[100dvh] p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
