import { useStateContext } from "../contexts/ContextProvider";
import { NavLink, useLocation } from "react-router-dom";
import { BiClipboard } from "react-icons/bi";
import { BsBugFill, BsKanbanFill, BsSunFill, BsMoonFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import Switch from "react-switch";
import navControlImg from "../assets/control.png";
import spiderLogo from "../assets/spider.svg";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar, theme, setTheme } = useStateContext();
  const location = useLocation();

  const hasProjectId = !!localStorage.getItem("project_id");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  const links = [
    { name: "Proiecte", icon: <BiClipboard size={24} />, path: "/proiecte" },
    ...(hasProjectId
      ? [
          {
            name: "Backlog",
            icon: <BsBugFill size={24} />,
            gap: true,
            path: "/tasks",
          },
          { name: "Kanban", icon: <BsKanbanFill size={24} />, path: "/kanban" },
        ]
      : []),
    {
      name: "Utilizatori",
      icon: <HiUserGroup size={24} />,
      gap: true,
      path: "/users",
    },
  ];

  return (
    <aside className="z-40">
      {/* Sidebar */}
      <div
        className={`${
          openSidebar ? "w-72" : "w-20"
        } relative flex h-screen flex-col justify-between bg-gray-200 p-5 pt-8 duration-300 dark:bg-slate-900`}
      >
        {/* Buton inchis/deschis sidebar-ul */}
        <img
          src={navControlImg}
          className={`${
            !openSidebar && "rotate-180"
          } absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-gray-200`}
          onClick={() => setOpenSidebar(!openSidebar)}
        />

        {/* Logo */}
        <div className="flex items-center gap-x-4">
          <img
            className={`${
              openSidebar && "rotate-[360deg]"
            } h-10 w-10 cursor-pointer duration-500`}
            src={spiderLogo}
            alt="Logo"
          />
          <h1
            className={`origin-left text-xl font-medium duration-300 dark:text-cyan-400 ${
              !openSidebar && "scale-0"
            }`}
          >
            Spider
          </h1>
        </div>

        {/* Lista de link-uri */}
        <div className="flex-grow">
          <ul className="pt-6">
            {links.map((link, index) => (
              <NavLink key={index} to={link.path}>
                <li
                  className={`${
                    link.gap ? "mt-9" : "mt-2"
                  } flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-cyan-500 dark:text-white ${
                    location.pathname === link.path ? "bg-cyan-400" : ""
                  }`}
                >
                  {link.icon}
                  <span className={`${!openSidebar && "hidden"} font-semibold`}>
                    {link.name}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>

        {/** Dark mode */}
        <div className="mx-3 mb-3 flex justify-center">
          {openSidebar ? (
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              onColor="#86d3ff"
              offColor="#223843"
              checkedIcon={
                <div className="flex h-full items-center justify-center">
                  <BsMoonFill size={22} />
                </div>
              }
              uncheckedIcon={
                <div className="flex h-full items-center justify-center text-yellow-500">
                  <BsSunFill size={22} />
                </div>
              }
              height={40}
              width={80}
              handleDiameter={28}
              className="mx-3 items-center"
            />
          ) : (
            <button
              onClick={toggleTheme}
              className="transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 focus:outline-none"
            >
              {theme === "dark" ? (
                <BsMoonFill size={22} className="text-white" />
              ) : (
                <BsSunFill size={22} />
              )}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
