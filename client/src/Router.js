import React from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      {/* TODO add not found route
      <Route path="/nof-found"/> */}
    </Routes>
  );
}

export default Router;
