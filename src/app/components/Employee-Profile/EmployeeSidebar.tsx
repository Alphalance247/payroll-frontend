"use client";
import PersonalDetails from "./PersonalDetails";
interface TabProps {
  activeTab: string;
  onClick: any;
  tabName: string;
  className: any;
}
const EmployeeSidebar = ({
  activeTab,
  onClick,
  tabName,
  className,
}: TabProps) => {
  return (
    <button onClick={onClick} className={className}>
      {tabName}
    </button>
  );
};

export default EmployeeSidebar;
