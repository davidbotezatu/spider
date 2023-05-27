import React from "react";
import { Routes, Route } from "react-router-dom";
import { Proiecte } from "./pages";
import { Navbar, Sidebar } from "./components";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex w-full flex-col">
        <Navbar />
        <main className="h-full bg-gray-100 p-4">
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Proiecte />} />
            <Route path="/login" element={<Login />} />
            <Route path="/changepass" element={<ChangePassword />} />
            <Route path="/resetpass" element={<ResetPassword />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
