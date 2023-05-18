import { Link, NavLink } from "react-router-dom";
import { GiSpiderWeb } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../assets/links";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { activareSidebar, setActivareSidebar } = useStateContext();

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-slate-200 m-2";

  return (
    <div className="ml-3 h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
      {activareSidebar && (
        <>
          {/* titlu si control sidebar */}
          <div className="flex items-center justify-between">
            {/* Logo si titlu */}
            <Link
              to="/"
              onClick={() => setActivareSidebar(false)}
              className="item-center ml-3 mt-4 flex gap-3 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              <GiSpiderWeb />
              <span>Spider</span>
            </Link>

            {/*buton control sidebar */}
            <button
              type="button"
              onClick={() =>
                setActivareSidebar((starePrecedenta) => !starePrecedenta)
              }
              className="block rounded-full p-3 text-xl hover:bg-slate-100 md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>

          {/* Meniu sidebar */}
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="m-3 mt-4 uppercase text-slate-400">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={() => {}}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
