import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Proiecte } from "./pages";
import { Sidebar } from "./components";
import Login from "./components/access/Login";
import ChangePassword from "./components/access/ChangePassword";
import ResetPassword from "./components/access/ResetPassword";

const App = () => {
  return (
    <>
      <Sidebar />
      <BrowserRouter>
        <div>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Proiecte />} />
            <Route path="/login" element={<Login />} />
            <Route path="/changepass" element={<ChangePassword />} />
            <Route path="/resetpass" element={<ResetPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
