import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
