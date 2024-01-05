import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Castload from "./Castload";

export default function Cast({ item }) {
  // state for cast
  const [cast, setCast] = useState([]);

  // state for loading image cvast
  const [imageLoading, setImageLoading] = useState(true);

  //ste for entire cast load
  const [castLoad, setCastLoad] = useState(true);

  const getCast = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${item.id}/credits`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGZhMjU2Y2QwNGQwZWY1MWU5Yzg3NDA2ZDYwZTZlOSIsInN1YiI6IjY1NjcxZjQyODlkOTdmMDBmZTdjYWM0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kl_pDgi8bCHFdY5Y1umnt37tBj4Wv4ds0FqKwCsdRA",
    },
  };

  useEffect(() => {
    axios
      .request(getCast)
      .then(function (response) {
        setCast(response.data.cast.splice(0, 5));
        setCastLoad(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      {castLoad ? (
        <div>
          <h1 className="text-center my-4">Cast</h1>
          <div className="p-row">
            <Castload />
            <Castload />
            <Castload />
            <Castload />
            <Castload />
          </div>
        </div>
      ) : (
        <div className="text-white">
          <h1 className="text-center my-4">Cast</h1>
          <p className="p-row out-view">
            {cast.map((each) => (
              <span key={each.id}>
                <div className="profile">
                  <div className="cast-img">
                    {imageLoading && <Castload />}
                    <img
                      className={imageLoading ? "hideen" : "out-view"}
                      onLoad={() => setImageLoading(false)}
                      src={`https://image.tmdb.org/t/p/original/${each?.profile_path}`}
                      alt={each.name}
                    />
                  </div>
                  <p className="text-sm">{each.name}</p>
                </div>
              </span>
            ))}
          </p>
        </div>
      )}
    </>
  );
}
