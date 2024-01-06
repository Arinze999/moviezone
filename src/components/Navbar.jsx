import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ModalInteractive from "./ModalInteractive";

export default function Navbar() {
  const { user, logOut } = UserAuth();
  // console.log(user);

  //state for interactive modal
  const [interact, setInteract] = useState(false);

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

  return (
    <>
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
              <button className="text-white pr-4 hover-up">Account</button>
            </Link>
            <button
              onClick={handleInteract}
              className="shrink bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-bar">
            <Link to="/login">
              <button className="text-white pr-4 hover-up py-2">Sign In</button>
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
