import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import Cast from "./Cast";
import Imageload from "./Imageload";

export default function Watchlist() {
  const { user } = UserAuth();

  //state to get watchlist movies
  const [movies, setMovies] = useState([]);

  // state for image loading
  const [imageLoading, setImageLoading] = useState(true);

  // State for selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);

  // slider function
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  //snapshot function effect
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.watchList);
    });
  }, [user?.email]);

  //delete function
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        watchList: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // function to handle image load
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Function to open modal for a specific movie
  const handleShowModal = (index) => {
    setSelectedMovie(index === selectedMovie ? null : index);
    console.log(selectedMovie);
  };

  return (
    <>
     <div className={!selectedMovie ? "" : "full-alert"}></div>
      <div className="md:mx-10 sm:mx-4 rounded-lg row pb-6 my-20">
        <h2 className="text-white font-bold md:text-xl p-8">Watchlist</h2>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            size={40}
            className="bg-white rounded-full absolute left-0  opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          />
          <div
            id={"slider"}
            className="p-3 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
          >
            {movies.map((item, index) => (
              <div
                key={index}
                className={
                  !(selectedMovie === index)
                    ? "out-view rounded-md movie-up movie overflow-hidden mx-4 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2"
                    : "in-view2"
                }
              >
                {imageLoading && <Imageload />}
                <img
                  onLoad={handleImageLoad}
                  className={`rounded-md w-full h-auto block ${
                    imageLoading ? "hidden" : ""
                  }`}
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item.title}
                />
                <div className="my-2 transition-all duration-300 text-white flex flex-col justify-center items-start">
                  <p
                    className={
                      !(selectedMovie === index)
                        ? "my-1 whitespace-nowrap text-xs md:text-sm font-bold h-full"
                        : "my-1 whitespace-nowrap text-lg md:text-lg font-bold h-full"
                    }
                  >
                    {item?.title}
                  </p>
                  <p className={!(selectedMovie === index) ? "text-xs" : ""}>
                    {item.date}
                  </p>
                  <p>{!(selectedMovie === index) ? "" : item.overview}</p>
                  <button
                    onClick={() => {
                      handleShowModal(index);
                    }}
                    className="shrink text-xs bg-red-600 p-2 rounded-md my-2"
                  >
                    {!(selectedMovie === index) ? "More Details.." : "Close"}
                  </button>
                  <div className="w-full">
                    {!(selectedMovie === index) ? "" : <Cast item={item} />}
                  </div>
                  <div className="flex flex-row justify-between my-1">
                    <p
                      onClick={() => deleteShow(item.id)}
                      className="text-gray-300 flex my-2 cursor-pointer hover:text-yellow-500"
                    >
                      <AiOutlineClose /> <small>Delete</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
