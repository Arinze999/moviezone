import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ModalAlert from "./ModalAlert";
import { FaCheckCircle } from "react-icons/fa";

export default function Userform() {
  // user
  const { user } = UserAuth();

  //navigation
  const navigate = useNavigate();

  //picking user data
  const userID = doc(db, "users", `${user?.email}`);

  // state for username
  const [username, setUsername] = useState();

  //state for button
  const [btnDisabled, setBtnDisabled] = useState(true);

  //state for alert modal to
  const [alert, setAlert] = useState(false);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateDoc(userID, {
      username: username,
    });
    handleAlert();
  };

  // function to activate or deactivate button
  const handleBtn = () => {
    setBtnDisabled(false);
  };

  // handle modal
  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <ModalAlert
        title="Success!"
        subtitle="Username saved"
        classes={alert ? "show-modal" : ""}
      >
        <FaCheckCircle size={32} color="limegreen" />
      </ModalAlert>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={process.env.PUBLIC_URL + "/images/cinemaUse.jpg"}
          alt="netbg"
        />
        <div className="bg-black/80 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed top-20 w-full px-4 py-4 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Assign Username</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => {
                    handleBtn();
                    setUsername(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Enter Username"
                  autoComplete="username"
                />
                <button
                  className={
                    btnDisabled
                      ? "bg-gray-600 py-3 my-6 rounded font-bold"
                      : "shrink bg-red-600 py-3 my-6 rounded font-bold"
                  }
                  disabled={btnDisabled}
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
