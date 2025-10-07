"use client";
import { MouseEventHandler } from "react";
interface TabProps {
  activeTab: string;
  onClick: MouseEventHandler;
  tabName: string;
  className: string;
}
const EmployeeSidebar = ({ onClick, tabName, className }: TabProps) => {
  return (
    <button onClick={onClick} className={className}>
      {tabName}
    </button>
  );
};

export default EmployeeSidebar;
