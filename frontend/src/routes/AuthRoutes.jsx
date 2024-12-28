import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Sponsor from "../pages/Sponsor.jsx";

export default function AuthRoutes () {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="sponsor" element={<Sponsor />} />
    </Routes>
  );
};
