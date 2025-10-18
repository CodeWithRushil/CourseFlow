import React from "react";
import SideBar from "./_components/SideBar";

export default function DashboardLayout({ children }) {
  const NAVBAR_HEIGHT = "4rem";
  const SIDEBAR_WIDTH = "16rem";

  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <SideBar />
      </div>
      <aside
        className="fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-white border-r border-gray-200 hidden sm:block"
        style={{ width: SIDEBAR_WIDTH }}
      >
      </aside>
      <main
        className="p-4 overflow-y-auto bg-white sm:ml-[250px]"
        style={{
          marginTop: NAVBAR_HEIGHT,
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        {children}
      </main>
    </div>
  );
}