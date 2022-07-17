import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState} from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import {faHouse, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {maski} from "../images/maski.png";
import {ethers} from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, REMOVE_FROM_CART, USER } from "../Redux/ActionTypes";

const Navbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.cart.user);


  const connectMetaMask = async () => {
    window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    

    dispatch({ type: USER, payload: account });
    console.log(account);

  }

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
              <Link to="/Admin">Admin</Link>
            </div>
            <div className="navbarItem">
              <button onClick={connectMetaMask} className="btn h-10 w-[100px] px-4 truncate"> {user} </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
