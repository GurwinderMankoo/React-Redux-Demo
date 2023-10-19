import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
