import { useState } from "react";

import navControlImg from "../assets/control.png";
import spiderLogo from "../assets/spider.svg";

import { links } from "../assets/links";

const Sidebar = () => {
  const [control, setControl] = useState(true);

  return (
    <aside className="flex">
      {/** Sidebar */}
      <div
        className={`${
          control ? "w-72" : "w-20"
        } relative h-screen bg-gray-200 p-5 pt-8 duration-300`}
      >
        {/** Buton inchis/deschis sidebar-ul */}
        <img
          src={navControlImg}
          className={`${
            !control && "rotate-180"
          } absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-gray-200`}
          onClick={() => setControl(!control)}
        />

        {/** Logo */}
        <div className="flex items-center gap-x-4">
          <img
            className={`${
              control && "rotate-[360deg]"
            } h-10 w-10 cursor-pointer duration-500`}
            src={spiderLogo}
            alt="Logo"
          />
          <h1
            className={`origin-left text-xl font-medium duration-300 ${
              !control && "scale-0"
            }`}
          >
            Spider
          </h1>
        </div>

        {/** Lista de link-uri */}
        <ul className="pt-6">
          {links.map((link, index) => (
            <li
              key={index}
              className={`${link.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-slate-500"
              } flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-cyan-500`}
            >
              {link.icon}
              <span
                className={`${!control && "hidden"} origin-left duration-200`}
              >
                {link.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 text-2xl font-semibold">
        <h1>HomePage</h1>
      </div>
    </aside>
  );
};

export default Sidebar;
