// THIS PAGE HAS ALL THE FIREBASE API LOGIC FOR USERS, NEW ACCOUNTS, ETC.

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // STATES
  // state for regsitering a new user
  const [user, setUser] = useState({});

  // signup function
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
      alreadyseen:[],
      disliked:[],
      watchList:[],
      username:[],
    });
  }

  // login function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
