import React, { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

import avatar from "../../data/avatar.jpg";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";

import { useStateContext } from "../../contexts/ContextProvider";

const UserProfile = React.forwardRef((props, ref) => {
  const { toggleUserProfile } = useStateContext();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Call the toggleUserProfile function to close the dropdown
        toggleUserProfile();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleUserProfile]);

  return (
    <div
      ref={ref}
      className="nav-item absolute right-1 top-16 w-96 rounded-lg bg-white p-8 dark:bg-[#42464D]"
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold dark:text-gray-200">User Profile</p>
        <button>{<MdOutlineCancel />}</button>
      </div>
      <div className="border-color border-b-1 mt-6 flex items-center gap-5 pb-6">
        <img
          className="h-24 w-24 rounded-full"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="text-xl font-semibold dark:text-gray-200">
            {" "}
            Michael Roberts{" "}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>
      <div>
        <ChangePassword />
      </div>
      <div className="mt-5">
        <Logout />
      </div>
    </div>
  );
});

export default UserProfile;
