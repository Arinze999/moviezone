import React, { useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaPlus,
  FaThumbsDown,
  FaExclamationCircle,
} from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Imageload from "./Imageload";
import Cast from "./Cast";
import ModalAlert from "./ModalAlert";
import Video from "./Video";

export default function Movie({ item }) {
  // state for icons
  const [like, setLike] = useState(false);
  const [see, setSee] = useState(false);
  const [seen, setSeen] = useState(false);
  const [dislike, setDislike] = useState(false);

  //user
  const { user } = UserAuth();

  //state for saved movie
  const [saved, setSaved] = useState();

  //state for watchlist
  const [watch, setWatch] = useState();

  //state for already seen
  const [haveSeen, setHaveSeen] = useState();

  //state for hate
  const [hate, setHate] = useState();

  //state for lazy load image
  const [lazy, setLazy] = useState("");

  // state for image loading
  const [imageLoading, setImageLoading] = useState(true);

  //movieID to identify each user movie
  const movieID = doc(db, "users", `${user?.email}`);

  //state for full movie modal
  const [fullmovieModal, setFullmovieModal] = useState(false);

  //state for alert modal to
  const [alert, setAlert] = useState(false);

  // state for video
  const [video, setVideo] = useState(false);

  //function to favourite a show/movie
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          overview: item.overview,
          date: item.release_date,
        }),
      });
    } else {
      handleAlert();
    }
  };

  //function to add to watchlist
  const towatch = async () => {
    if (user?.email) {
      setSee(!see);
      setWatch(true);
      await updateDoc(movieID, {
        watchList: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          overview: item.overview,
          date: item.release_date,
        }),
      });
    } else {
      handleAlert();
    }
  };

  //function to add to already seen
  const toSeen = async () => {
    if (user?.email) {
      setSeen(!seen);
      setHaveSeen(true);
      await updateDoc(movieID, {
        alreadyseen: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          overview: item.overview,
          date: item.release_date,
        }),
      });
    } else {
      handleAlert();
    }
  };

  //function to save hated movies
  const toHate = async () => {
    if (user?.email) {
      setDislike(!dislike);
      setHate(true);
      await updateDoc(movieID, {
        disliked: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path || "",
          overview: item.overview,
          date: item.release_date,
        }),
      });
    } else {
      handleAlert();
    }
  };

  // function to open modal
  const handleShowModal = () => {
    setFullmovieModal(!fullmovieModal);
    setVideo(false);
  };

  // handle modal
  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  //handle video state
  const handleVideo = (e) => {
    e.preventDefault();
    setVideo(!video);
    console.log(video);
  };

  return (
    <>
      <ModalAlert
        title="Access Denied"
        subtitle="Please Sign In to perform action"
        classes={alert ? "show-modal" : ""}
      >
        <FaExclamationCircle size={32} color="red" />
      </ModalAlert>
      <div
        className={
          !fullmovieModal
            ? "rounded-md out-view movie-up movie overflow-hidden mx-4 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2"
            : "full-alert"
        }
      >
        <div className={!fullmovieModal ? "" : "in-view"}>
          {imageLoading && <Imageload />}
          {video ? (
            <div className="video-container">
              <Video id={item.id} />
            </div>
          ) : (
            <img
              onLoad={() => setImageLoading(false)}
              className={`rounded-md w-full h-auto block ${
                imageLoading ? "hidden" : ""
              }`}
              src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
              alt={item.title}
            />
          )}
          <div className="my-2 transition-all duration-300 text-white">
            <p
              className={
                !fullmovieModal
                  ? "my-1 whitespace-nowrap text-xs md:text-sm font-bold h-full"
                  : "my-1 whitespace-normal text-2xl font-bold h-full"
              }
            >
              {item?.title}
              {fullmovieModal && (
                <button
                  onClick={handleVideo}
                  className="ml-2 text-sm font-thin bg-red-600 cursor-pointer p-1 rounded-md shrink"
                >
                  {video ? "Now Playing" : "Trailer"}
                </button>
              )}
            </p>
            <p className={!fullmovieModal ? "text-xs" : "text-xl"}>
              Released: {item?.release_date}
            </p>
            <div>
              {fullmovieModal && (
                <p className="text-xs sm:text-md md:text-md lg:text-lg xl:text-lg whitespace-normal">
                  {item.overview}
                </p>
              )}
            </div>
            <div
              onClick={towatch}
              className={
                !fullmovieModal
                  ? "text-xs flex my-2"
                  : "hidden text-sm my-2 cursor-pointer"
              }
            >
              {see ? (
                <p className="flex hover:text-yellow-500 transform transition-transform duration-300">
                  In WatchList <FaCheck className="mx-2 text-sm" />
                </p>
              ) : (
                <p className="flex hover:text-yellow-500 transform transition-transform duration-300">
                  Add to WatchList <FaPlus className="mx-2 text-sm" />
                </p>
              )}
            </div>
            <div
              onClick={toSeen}
              className={
                !fullmovieModal
                  ? "text-xs flex my-2"
                  : " hidden text-sm my-2 cursor-pointer"
              }
            >
              {haveSeen ? (
                <p className="flex hover:text-yellow-500 transform transition-transform duration-300">
                  Seen <IoIosEyeOff className="mx-2 text-sm" />
                </p>
              ) : (
                <p className="flex hover:text-yellow-500 transform transition-transform duration-300">
                  Already Seen? <IoIosEye className="mx-2 text-sm" />
                </p>
              )}
            </div>
            <button
              onClick={handleShowModal}
              className="shrink text-xs bg-red-600 p-2 rounded-md my-1"
            >
              {!fullmovieModal ? (
                "More Details.."
              ) : (
                <p className="text-md">Close</p>
              )}
            </button>
            <div className="flex flex-row justify-between my-1">
              <p
                onClick={saveShow}
                className={!fullmovieModal ? "" : "hidden text-2xl my-2"}
              >
                {like ? (
                  <FaHeart className="my-1 text-yellow-500 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-120" />
                ) : (
                  <FaRegHeart className="my-1 text-yellow-500 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-120" />
                )}
              </p>
              <p
                onClick={toHate}
                className={!fullmovieModal ? "" : "hidden text-2xl my-2"}
              >
                {dislike ? (
                  <FaThumbsDown className="text-yellow-500 transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-120" />
                ) : (
                  <FaThumbsDown className="transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-120" />
                )}
              </p>
            </div>
            <div>
              {fullmovieModal && (
                <div className="my-2 text-md">
                  <Cast item={item} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
