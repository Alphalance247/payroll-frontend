"use client";
import React, { ReactNode } from "react";
import Sidebar from "./sideBar";
import TopBar from "./topBar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1800px] h-screen mx-auto flex flex-col">
      <TopBar />

      <div className="grid grid-cols-[20%auto] overflow-hidden w-full h-full">
        <Sidebar />
        <>{children}</>
      </div>
    </div>
  );
};

export default DashboardLayout;
