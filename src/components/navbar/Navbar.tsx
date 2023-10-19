import React from "react";
import { Link } from "react-router-dom";

import Style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={Style.navbar}>
      <div className={Style.navbarContainer}>
        <span className={Style.logo}>
          <Link to="/">React-Redux-Toolkit</Link>
        </span>
        <ul className={Style.linksContainer}>
          <li>
            <Link to="/user">Users</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
