import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ModalInteractive from "./ModalInteractive";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";

export default function Navbar() {
  const { user, logOut } = UserAuth();
  // console.log(user);

  //state for interactive modal
  const [interact, setInteract] = useState(false);

  //state to toggle nav
  const [nav, setNav] = useState(true);

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await logOut();
      handleInteract();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // handle intercat
  const handleInteract = () => {
    setInteract(!interact);
  };

  //handle nav toggle
  const handleToggle = () => {
    setNav(!nav);
    console.log(nav);
  };

  return (
    <>
      {/* <AiOutlineMenuUnfold onClick={handleToggle} className="nav-toggle" size={25}/> */}
      <ModalInteractive
        title="Confirm"
        subtitle="Are you sure you want to Logout?"
        logout={handleLogout}
        close={handleInteract}
        classes={interact ? "show-interact" : ""}
      ></ModalInteractive>
      <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            MOVIE<span className="text-white">ZONE</span>
          </h1>
        </Link>
        {user?.email ? (
          <div className="nav-bar">
            <Link to="/account">
              <button className="text-white  shrink py-2">Account</button>
            </Link>
            <button
              onClick={handleInteract}
              className="shrink bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className={`nav-bar ${nav ? "show-nav" : ""}`}>
            {nav ? (
              <AiOutlineMenuUnfold
                onClick={handleToggle}
                className="nav-toggle cursor-pointer"
                size={25}
              />
            ) : (
              <AiOutlineClose
                onClick={handleToggle}
                className="nav-toggle cursor-pointer"
                size={25}
              />
            )}

            <Link to="/login">
              <button className="text-white shrink py-2 px-6">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="shrink bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
