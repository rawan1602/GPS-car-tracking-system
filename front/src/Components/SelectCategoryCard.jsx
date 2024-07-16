import React from "react";

import { useCategory } from "./SelectCategoryProvider";
import { useCard } from "./CardProvider";
import { CardRadioButton } from "./CardFields";
import CloseSVG from "../assets/CloseSVG";
import "../Styles/CardSelect.css";

export default function SelectCategoryCard() {
  const { toggleCard } = useCard();
  const { selected, updateSelected } = useCategory();

  return (
    <div className="d-flex flex-column justify-content-between" style={{ width: "70vw", height: "20vh" }}>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <p className="m-0">Status</p>

        <div onClick={toggleCard}>
          <CloseSVG />
        </div>
      </div>

      <hr className="m-0" />

      <CardRadioButton
        id="select-category-cairo"
        label="Cairo"
        name="select-category"
        checked={selected === "Cairo"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Cairo");
          }
        }}
      />
      <CardRadioButton
        id="select-category-alex"
        label="Alexandria"
        name="select-category"
        checked={selected === "Alexandria"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Alexandria");
          }
        }}
      />
      <CardRadioButton
        id="select-category-giza"
        label="Giza"
        name="select-category"
        checked={selected === "Giza"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Giza");
          }
        }}
      />
      <CardRadioButton
        id="select-category-aswan"
        label="Aswan"
        name="select-category"
        checked={selected === "Aswan"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Aswan");
          }
        }}
      />
    </div>
  );
}
