import React, { ReactNode } from "react";
import Sidebar from "./sideBar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full">
        {children}
        {/* <TopBar />

        <main className="p-4 overflow-auto">{children}</main> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
