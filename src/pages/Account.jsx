import React from "react";
import { useState, useEffect, useRef } from "react";
import SavedShows from "../components/SavedShows";
import Disliked from "../components/Disliked";
import Alreadyseen from "../components/Alreadyseen";
import Watchlist from "../components/Watchlist";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import Username from "../components/Username";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Account() {
  const user = UserAuth();

  const navigate = useNavigate();

  //account state and default view
  const [display, setDisplay] = useState("Favourites");

  //refs for account sections
  const favourites = useRef();
  const disliked = useRef();
  const alreadyseen = useRef();
  const watchlist = useRef();

  //state function
  const inView = (select) => {
    setDisplay(select?.current.textContent);
  };

  //edit username function
  const editUsername = () => {
    navigate("/userform");
  };

  return (
    <>
      <div className="w-full text-white">
        <img
          className=" w-full h-[30rem] object-cover"
          src={process.env.PUBLIC_URL + "/images/cinemaUse.jpg"}
          alt="netbg"
        />
        <div className="bg-black/80 absolute top-0 left-0 w-full h-[30rem]">
          <div className="absolute top-[20%] p-4 md:p-8">
            <p>User:</p>
            <h1 className="text-3xl md:text-5xl font-bold py-5">
              <Username />
            </h1>
            <button
              onClick={editUsername}
              className="text-sm bg-red-600 p-3 rounded shrink flex justify-between items-center"
            >
              Edit Username <FaEdit className="mx-2" />
            </button>
          </div>
        </div>
      </div>
      <ul className="w-full text-gray-300 font-bold rounded-lg p-2 cursor-pointer bg-black bg-opacity-50 flex flex-row justify-around">
        <li
          onClick={() => {
            inView(favourites);
          }}
          ref={favourites}
          className="p-4 zoom z-50 hover:text-white active:text-yellow-500 text-sm md:text-md"
        >
          Favourites
        </li>
        <li
          onClick={() => {
            inView(disliked);
          }}
          ref={disliked}
          className="p-4 zoom z-50 hover:text-white active:text-yellow-500 text-sm md:text-md"
        >
          Disliked
        </li>
        <li
          onClick={() => {
            inView(alreadyseen);
          }}
          ref={alreadyseen}
          className="p-4 zoom z-50 hover:text-white active:text-yellow-500 text-sm md:text-md"
        >
          Already seen
        </li>
        <li
          onClick={() => {
            inView(watchlist);
          }}
          ref={watchlist}
          className="p-4 zoom z-50 hover:text-white active:text-yellow-500 text-sm md:text-md"
        >
          Watchlist
        </li>
      </ul>
      {display === "Favourites" ? (
        <SavedShows />
      ) : display === "Disliked" ? (
        <Disliked />
      ) : display === "Already seen" ? (
        <Alreadyseen />
      ) : display === "Watchlist" ? (
        <Watchlist />
      ) : (
        ""
      )}
      <Footer/>
    </>
  );
}
