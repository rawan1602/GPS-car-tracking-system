import React from "react";
import { useNavigate } from "react-router-dom";

import { useCard } from "../Components/CardProvider";
import SearchBar from "../Components/SearchBar";
import ProfilePicture from "../Components/ProfilePicture";
import AddCategoryCard from "../Components/AddCategoryCard";
import AddSVG from "../assets/AddSVG";
import "../Styles/Home.css";

export default function Categories() {
  const navigate = useNavigate();
  const { updateContent: setCardContent, toggleCard } = useCard();

  return (
    <div className="h-100 p-3 d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <span className="category-name" style={{ fontSize: 24 }}>
          Categories
        </span>

   
      </div>

      <SearchBar autoFocus={false} onClick={() => navigate("/search")} />

      <div className="d-flex flex-column justify-content-between align-items-center gap-3">
        <div className="w-100 d-flex gap-2 align-items-center">
          <div className="w-100 d-flex flex-column gap-2">
            <div
              className="py-3 px-2 d-flex align-items-center justify-content-between rounded"
              style={{ backgroundColor: "#242226" }}
              onClick={function () {
                navigate("/categories/cairo");
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div style={{ backgroundColor: "#FF0099", width: 2, height: 14 }}></div>
                <span className="category-name">Cairo</span>
              </div>
              <span className="category-name" style={{ color: "#FF0099" }}>
                50
              </span>
            </div>

            <div
              className="py-3 px-2 d-flex align-items-center justify-content-between rounded"
              style={{ backgroundColor: "#242226" }}
              onClick={function () {
                navigate("/categories/others");
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div style={{ backgroundColor: "#CE54FF", width: 2, height: 14 }}></div>
                <span className="category-name">Others</span>
              </div>
              <span className="category-name" style={{ color: "#CE54FF" }}>
                50
              </span>
            </div>
          </div>

          <div className="w-100 d-flex flex-column gap-2">
            <div
              className="py-3 px-2 d-flex align-items-center justify-content-between rounded"
              style={{ backgroundColor: "#242226" }}
              onClick={function () {
                navigate("/categories/alex");
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <div style={{ backgroundColor: "#1CDCFF", width: 2, height: 14 }}></div>
                <span className="category-name">Alexandria</span>
              </div>
              <span className="category-name" style={{ color: "#1CDCFF" }}>
                50
              </span>
            </div>

            <div className="d-flex align-items-center justify-content-around rounded" style={{ backgroundColor: "#242226" }}>
              <div
                onClick={function () {
                  setCardContent(<AddCategoryCard />);
                  toggleCard();
                }}
              >
                <AddSVG />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
