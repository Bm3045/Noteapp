import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Welcome from "./pages/Welcome";
import Notes from "./pages/Notes";
import Signin from "./pages/Signin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
};

export default App;
