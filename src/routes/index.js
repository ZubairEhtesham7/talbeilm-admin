import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashbaord from "../components/mainDashboard/";
import SignIn from "../components/signIn";
import { useSelector } from "react-redux";
import ViewFullInstitute from "../components/viewfullinstitute";

function Router22() {
  let isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashbaord />}></Route>
          <Route path="/institute/:id" element={<ViewFullInstitute />}></Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Router22;
