import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../assets/avatar.jpg";
import { ProfilUtilizator } from ".";
import { useStateContext } from "../contexts/ContextProvider";

const Navbar = () => {
  const { clicked, handleClick } = useStateContext();

  return (
    <div className="relative flex justify-between p-2 md:mx-6">
      <div className="flex">
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

        {clicked.profilUtilizator && <ProfilUtilizator />}
      </div>
    </div>
  );
};
export default Navbar;
