import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../requests";

export default function Main() {
  // STATES
  // popular movies state
  const [movies, setMovies] = useState([]);

  // EFFECTS
  // popular movies effect
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  // show one random popular movie at a time
  const movie = movies[Math.floor(Math.random() * movies.length)];

  // function to reduce length of movie description
  const shortenDescription = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className="banner w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:5xl font-bold">{movie?.title}</h1>
            <div className="my-4">
              {/* <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
                Play
              </button>
              <button className="border text-white border-gray-300 py-2 px-5 ml-4">
                Watch Later
              </button> */}
            </div>
            <p className="text-gray-400 text-sm">
              Released: {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {shortenDescription(movie?.overview, 170)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
