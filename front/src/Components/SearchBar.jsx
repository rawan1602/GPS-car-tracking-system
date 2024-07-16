import React from "react";

import SearchSVG from "../assets/SearchSVG";
import "../Styles/Search.css";

export default function SearchBar({ ...props }) {
  return (
    <div className="search-field w-100">
      <SearchSVG />

      <input
        autoFocus
        type="search"
        placeholder="Search"
        className="w-100 d-flex gap-1 align-items-center border border-dark rounded p-3"
        style={{ backgroundColor: "#1F1E22" }}
        {...props}
      />
    </div>
  );
}
