import React, { Children, useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import Videoloading from "./Videoloading";

export default function Video({ key, id, classes, children }) {
  // state for the video
  const [videos, setVideos] = useState();

  // state for video loading
  const [load, setLoad] = useState(true);

  // api fetch
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGZhMjU2Y2QwNGQwZWY1MWU5Yzg3NDA2ZDYwZTZlOSIsInN1YiI6IjY1NjcxZjQyODlkOTdmMDBmZTdjYWM0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kl_pDgi8bCHFdY5Y1umnt37tBj4Wv4ds0FqKwCsdRA",
    },
  };

  useEffect (()=> {
  axios
  .request(options)
  .then(function (response) {
    const trailers = response.data.results.filter((obj) => {
      return (
        obj.type.toLowerCase().includes("teaser") ||
        obj.type.toLowerCase().includes("trailer")
      );
    });
    const randomTrailer =
      trailers[Math.floor(Math.random() * trailers.length)];
    setVideos(randomTrailer);
    // console.log(videos);
    handleLoad();
  })
  .catch(function (error) {
    console.error(error);
  });
  },[])


  // loading video function
  const handleLoad = () => {
    setLoad(false);
  };

  //video option
  const opts = {
    playerVars: {
      autoplay: 1,
      showRelatedVideos: false,
      modestbranding: 1, // Hide YouTube logo
      rel: 0,
    },
  };

  return (
    <>
      {load ? (
        <Videoloading />
      ) : (
        <div className="video-container">
          <YouTube
            videoId={videos?.key}
            opts={opts}
            className={`out-view youtube ${classes}`}
            onReady={handleLoad}
          />
          {children}
        </div>
      )}
    </>
  );
}
