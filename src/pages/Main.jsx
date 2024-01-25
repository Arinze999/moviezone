import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import requests from "../requests";
import Video from "../components/Video";
import { FaPlay, FaStop } from "react-icons/fa";

export default function Main() {
  // STATES
  // popular movies state
  const [movies, setMovies] = useState([]);

  // state for video
  const [video, setVideo] = useState(false);

  // EFFECTS
  // popular movies effect
  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  // show one random popular movie at a time
  const movie = useMemo(() => {
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]);

  // function to reduce length of movie description
  const shortenDescription = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  //handle video state
  const handleVideo = (e) => {
    e.preventDefault();
    setVideo(!video);
    console.log(video);
  };

  // Memoize the Video component to avoid unnecessary re-renders
  const memoizedVideoComponent = useMemo(() => {
    if (movie) {
      return <Video classes={"video"} id={movie.id} />;
    }
    return null;
  }, [movie]);

  return (
    <>
      <div className="banner w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          {video ? (
            <div className="out-view w-full h-full bg-black video-container">
              {memoizedVideoComponent}
            </div>
          ) : (
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
          )}
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1
              className={`text-3xl md:5xl font-bold ${
                video ? "hidden md:block md:text-lg" : ""
              }`}
            >
              {movie?.title}
            </h1>
            <div className="my-4">
              <button
                onClick={handleVideo}
                className={`border bg-gray-300 text-black hover:border-white py-2 px-5 flex justify-center items-center rounded-md hover:text-white hover:bg-transparent transition duration-300 ease-in-out ${
                  video && "bg-transparent  border-white text-white"
                }`}
              >
                {video ? (
                  <div className="flex justify-center items-center">
                    <FaStop className="mx-2" /> <p>Close</p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <FaPlay className="mx-2" /> <p>Trailer</p>
                  </div>
                )}
              </button>
              {/* <button
                onClick={handleVideo}
                className="border text-white border-gray-300 py-2 px-5 ml-4"
              >
                Watch Trailer
              </button> */}
            </div>
            <p className={`text-gray-400 text-sm ${video ? "hidden" : ""}`}>
              Released: {movie?.release_date}
            </p>
            <p
              className={`w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 ${
                video ? "hidden" : ""
              }`}
            >
              {shortenDescription(movie?.overview, 170)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
