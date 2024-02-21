import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Rating({ id }) {
  // rating state
  const [rating, setRating] = useState("");

  // showing rateing state
  const [show, setShow] = useState("");

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/reviews`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGZhMjU2Y2QwNGQwZWY1MWU5Yzg3NDA2ZDYwZTZlOSIsInN1YiI6IjY1NjcxZjQyODlkOTdmMDBmZTdjYWM0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-kl_pDgi8bCHFdY5Y1umnt37tBj4Wv4ds0FqKwCsdRA",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      setRating(
        response.data.results.map((each) => each.author_details.rating)
      );
      setShow(
        parseInt(
          rating?.reduce((acc, curr) => acc + curr, 0) /
            rating.filter((value) => typeof value === "number").length
        )
      );
      console.log(rating);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <>
      <div className="text-xs mb-1">
        Rating:{" "}
        {show
          ? show
          : isNaN(show)
          ? "none yet"
          : "Loading..."}
      </div>
    </>
  );
}
