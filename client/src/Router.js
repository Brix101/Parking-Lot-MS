import React from "react";
import { Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./components/Dashboard";
import Parker from "./components/Parker";
import ParkerImage from "./components/ParkerImage";
import Parking from "./components/Parking";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="parker" element={<Parker />} />
        <Route path="parker-image" element={<ParkerImage />} />
        <Route path="parking" element={<Parking />} />
      </Route>
      {/* TODO add not found route
      <Route path="/nof-found"/> */}
    </Routes>
  );
}

export default Router;
