import React, { useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../assets/avatar.jpg";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { isDropdownOpen, toggleUserProfile } = useStateContext();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleUserProfile();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleUserProfile]);

  return (
    <header className="h-auto bg-gray-200">
      <nav className="container mx-auto flex justify-end">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-slate-200"
          onClick={toggleUserProfile}
        >
          <img src={avatar} className="h-8 w-8 rounded-full" alt="avatar" />
          <p>
            <span className="text-[14px] text-gray-600">Hi, </span>{" "}
            <span className="ml-1 text-[14px] font-bold text-gray-600">
              Test
            </span>
          </p>
          <MdKeyboardArrowDown className="text-[14px] text-gray-400" />
        </button>

        {isDropdownOpen && <UserProfile ref={dropdownRef} />}
      </nav>
    </header>
  );
};

export default Navbar;
