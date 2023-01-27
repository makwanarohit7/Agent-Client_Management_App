import React from "react";
import { Navigate } from "react-router-dom";

function Private({ children }) {
  const isAuthenicated = sessionStorage.getItem("Token");
  return isAuthenicated ? children : <Navigate to="/" />;
}

export default Private;
