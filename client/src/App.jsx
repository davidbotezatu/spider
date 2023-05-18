import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Bugs, Kanban, Proiecte, Utilizatori } from "./pages";

import { useStateContext } from "./contexts/ContextProvider";

import "./App.css";

const App = () => {
  const { activareSidebar } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        {/* sidebar */}
        <div className="relative flex dark:bg-slate-800">
          {activareSidebar ? (
            <div className="sidebar fixed w-72 bg-white dark:bg-slate-700">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-slate-700">
              <Sidebar />
            </div>
          )}

          {/* navbar */}
          <div
            className={`min-h-screen w-full bg-slate-50 dark:bg-slate-50 ${
              activareSidebar ? " md:-ml-72" : ""
            }`}
          >
            <div className="navbar fixed z-50 w-full bg-slate-50 dark:bg-slate-800 md:static">
              <Navbar />
            </div>
          </div>

          {/* Routes */}
          <div>
            <Routes>
              <Route path="/" element={<Proiecte />} />
              <Route path="/proiecte" element={<Proiecte />} />
              <Route path="/bugs" element={<Bugs />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/utilizatori" element={<Utilizatori />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
