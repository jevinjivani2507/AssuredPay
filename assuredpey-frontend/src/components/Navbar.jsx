import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import {faHouse, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {maski} from "../images/maski.png";

const Navbar = () => {
  return (
    <nav className="top-0 sticky bg-[#222831]">
      <div className="flex items-center h-[65px] px-[60px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <div className="">
              <Link to="/">
                <img className="h-12 w-auto" src={logo} alt="Workflow" />
              </Link>
            </div>
          </div>
          <div className="flex">
            <div className="navbarItem">
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              <Link to="/">Dashboard</Link>
            </div>
            <div className="navbarItem">
              <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
              <Link to="/Cart">Cart : 0</Link>
            </div>
            <div className="navbarItem">
              <Link to="/Vendor">Vendor</Link>
            </div>
            <div className="navbarItem">
              {/* <img src={maski} alt="" className="h-3 w-3" /> */}
              <Link to="/Cart">Connect</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
