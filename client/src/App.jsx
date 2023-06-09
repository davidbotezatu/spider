import React from "react";
import PrivateRoute from "./utils/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import {
  Proiecte,
  Tasks,
  Kanban,
  Users,
  ChangePassUponReset,
  ChangePassword,
  ResetPassword,
  Login,
} from "./pages";
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isValidToken } = useStateContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex">
      {isValidToken && <Sidebar />}

      <div className="flex w-full flex-grow flex-col">
        {isValidToken && <Navbar />}
        <main className="h-full bg-gray-100 p-10 dark:bg-slate-800 dark:text-white">
          {/* Routes */}
          <Routes>
            {isValidToken || <Route path="/login" element={<Login />} />}
            <Route path="/resetpass" element={<ResetPassword />} />
            <Route path="/reset/:token" element={<ChangePassUponReset />} />
            <Route element={<PrivateRoute />}>
              <Route path="*" element={<Proiecte />} />
              <Route path="/" element={<Kanban />} />
              <Route path="/proiecte" element={<Proiecte />} exact />
              <Route path="/changepass" element={<ChangePassword />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </main>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
