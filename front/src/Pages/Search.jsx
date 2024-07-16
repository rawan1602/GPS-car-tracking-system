import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "../Components/SearchBar";
import LeftArrowSVG from "../assets/LeftArrowSVG";

export default function Search() {
  return (
    <div className="h-100 p-3">
      <div className="d-flex gap-3 align-items-center">
        <Link to="/">
          <LeftArrowSVG />
        </Link>

        <SearchBar />
      </div>

      <hr />
    </div>
  );
}
