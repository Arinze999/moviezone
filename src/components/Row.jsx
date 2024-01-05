import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Componentload from "./Componentload";

export default function Row({ title, fetchURL, rowID }) {
  // STATES
  // state for each category of movies
  const [movies, setMovies] = useState([]);

  //state for loading
  const [loading, setLoading] = useState(true);

  //EFFECTS
  // effect for each category of movies
  useEffect(() => {
    setLoading(true);
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, [fetchURL]);

  // slider function
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 300;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <>
      <div className="md:mx-10 sm:mx-4 rounded-lg row pb-6">
        <h2 className="text-white font-bold md:text-xl p-8">{title}</h2>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            size={40}
            className="bg-white rounded-full absolute left-0  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          />
          <div
            id={"slider" + rowID}
            className="p-3 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {loading ? (
              <>
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
                <Componentload />
              </>
            ) : (
              movies.map((item, id) => <Movie item={item} />)
            )}
          </div>
          <MdChevronRight
            onClick={slideRight}
            size={40}
            className="bg-white rounded-full absolute right-0  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          />
        </div>
      </div>
    </>
  );
}
