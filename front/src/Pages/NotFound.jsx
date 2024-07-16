import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-3 text-center">
      <h1>Forbidden!</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}
