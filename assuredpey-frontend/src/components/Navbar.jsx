import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="top-0 sticky bg-[#222831]">
      <div className="flex items-center h-[65px] px-[60px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            />
          </div>
          <div className="flex">
            <div className="navbarItem">
              <Link to="/">Dashboard</Link>
            </div>
            <div className="navbarItem">
              <Link to="/Cart">Cart : 0</Link>
            </div>
            <div className="navbarItem">
              <Link to="/Vendor">Vendor</Link>
            </div>
            <div className="navbarItem">
              <Link to="/Cart">Connect</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
