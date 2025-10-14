"use client";
import React, { ReactNode } from "react";
import EmployeeSideBar from "./employeeSideBar";
import TopBar from "../../topBar";

const EmployeeDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1800px] h-screen mx-auto flex flex-col">
      <TopBar />

      <div className="grid grid-cols-[20%auto] overflow-hidden w-full h-full">
        <EmployeeSideBar />
        <>{children}</>
      </div>
    </div>
  );
};

export default EmployeeDashboardLayout;
