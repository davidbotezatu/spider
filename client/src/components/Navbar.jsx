import React, { useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { isDropdownOpen, toggleUserProfile } = useStateContext();
  const dropdownRef = useRef(null);

  return (
    <header className="h-auto bg-gray-200 dark:bg-slate-900">
      <nav className="mx-auto flex justify-end">
        <button
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-slate-200 dark:hover:bg-slate-600"
          onClick={toggleUserProfile}
        >
          <img
            src={localStorage.getItem("user_avatar")}
            className="h-8 w-8 rounded-full"
            alt="avatar"
          />
          <p>
            <span className="text-[14px] text-gray-600 dark:text-white">
              Salut,{" "}
            </span>{" "}
            <span className="ml-1 text-[14px] font-bold text-gray-600 dark:text-white">
              {`${localStorage.getItem("user_nume")} ${localStorage.getItem(
                "user_prenume"
              )}`}
            </span>
          </p>
          <MdKeyboardArrowDown className="text-[14px] text-gray-400 dark:text-white" />
        </button>

        {isDropdownOpen && <UserProfile ref={dropdownRef} />}
      </nav>
    </header>
  );
};

export default Navbar;
