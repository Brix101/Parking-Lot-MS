import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./components/Dashboard";
import Account from "./components/Account";
import Parker from "./components/Parker";
import Parkers from "./components/Parkers";
import Parking from "./components/Parking";
import ParkingSpot from "./components/ParkingSpot";
import User from "./components/User";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="account" element={<Account />} />
        <Route path="parker" element={<Parkers />} />
        <Route path="parker/:plate" element={<Parker />} />
        <Route path="parking" element={<Parking />} />
        <Route path="parking-spot" element={<ParkingSpot />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="*" element={<Navigate to={-1} />} />
    </Routes>
  );
}

export default Router;
