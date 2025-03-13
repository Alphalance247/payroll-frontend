import React, { ReactNode } from "react";

const TopBar = ({ children }: { children: ReactNode }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 ">
      {children}
    </header>
  );
};

export default TopBar;
