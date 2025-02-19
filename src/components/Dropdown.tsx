import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface DropdownItem {
  path: string;
  label: string;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  icon: IconDefinition;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown my-4">
      <button
        className="dropdownBtn"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="font-bold">
          <FontAwesomeIcon icon={icon} className="fa-solid fa-school me-2" />
          {title}</span>
        <span className={`ms-auto transition-transform ${isOpen ? 'rotate-90' : ''}`}>
        <i className="fa-solid fa-angle-right"></i>
        </span>
      </button>
      <ul className={`dropdown-menu w-100 mt-2 shadow-lg ${isOpen ? 'show' : ''}`}>
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;