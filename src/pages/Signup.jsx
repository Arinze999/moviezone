import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import ModalAlert from "../components/ModalAlert";
import { FaCheckCircle } from "react-icons/fa";

export default function Signup() {
  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [username, setUsername] = useState();

  //state for alert modal to
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  // SUBMIT BUTTON FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      handleAlert();
      // should naviagate to login
    } catch (error) {
      console.log(error);
    }
  };

  // handle modal
  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      navigate("/userform");
    }, 2000);
  };

  return (
    <>
      <ModalAlert
        title="Success!"
        subtitle="Account created"
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
              <h1 className="text-3xl font-bold">Sign Up <small className="text-sm">(Create Account)</small></h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="Current-password"
                />
                <button className="shrink bg-red-600 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-small text-gray-500">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-500">Already on Moviezone?</span>{" "}
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
