import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import RootLayout from "./Layouts/RootLayout";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Alerts from "./Pages/Alerts";
import Maps from "./Pages/Maps";
import Reports from "./Pages/Reports";
import Report from "./Pages/Report";
import Categories from "./Pages/Categories";
import Category from "./Pages/Category";
import Car from "./Pages/Car";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";
import "./data/Status";
import { STATUS } from "./data/Status";
import CurrentLocation from "./Pages/CurrentLocation";
import UpdateMap from "./Pages/UpdateMap";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (token && token.length > 1){
      setIsLoggedIn(true);
    }
 
  }, [navigate]);

  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {isLoggedIn && (
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:category" element={<Category />} />
          <Route path="Map/:id" element={<CurrentLocation />} />
          <Route path="Update/:id" element={<UpdateMap />} />
          <Route path="cars/:car" element={<Car />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:report" element={<Report />} />
          <Route path="maps" element={<Maps />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </Routes>
  );
}
