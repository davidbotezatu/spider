import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../assets/avatar.jpg";
import { Notificari, ProfilUtilizator } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ customFunc, icon, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    className="relative rounded-full p-3 text-xl text-blue-500 hover:bg-slate-200"
  >
    <span
      style={{ background: dotColor }}
      className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    activareSidebar,
    setActivareSidebar,
    clicked,
    setClicked,
    handleClick,
  } = useStateContext();

  return (
    <div className="relative flex justify-between p-2 md:mx-6">
      <NavButton
        customFunc={() => setActivareSidebar((s) => !s)}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          dotColor="#d80505"
          customFunc={() => handleClick("notificari")}
          icon={<RiNotification2Fill />}
        />

        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg p-1 hover:bg-slate-200"
          onClick={() => handleClick("profilUtilizator")}
        >
          <img src={avatar} className="h-8 w-8 rounded-full" />
          <p>
            <span className="text-[14px] text-gray-400">Hi, </span>{" "}
            <span className="ml-1 text-[14px] font-bold text-gray-400">
              Test
            </span>
          </p>
          <MdKeyboardArrowDown className="text-[14px] text-gray-400" />
        </div>

        {clicked.notificari && <Notificari />}
        {clicked.profilUtilizator && <ProfilUtilizator />}
      </div>
    </div>
  );
};
export default Navbar;
