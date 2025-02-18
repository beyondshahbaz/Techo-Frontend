import React from "react";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const StudentsItems = [
    { path: "/Students_profile", label: "PROFILE" },
    { path: "/Students_batches", label: "BATCHES" },
  ];

  if (!isSidebarOpen) return null;

  return (
    <div>
      {/* <ul className="mt-4">
        <li className="mb-2">
          <Dropdown
            title="Student Dashboard"
            items={StudentsItems}
            icon={faSchool}
          />
        </li>
      </ul> */}
    </div>
  );
};

export default Sidebar;
