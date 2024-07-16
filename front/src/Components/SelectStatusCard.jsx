import React from "react";

import { useStatus } from "./SelectStatusProvider";
import { useCard } from "./CardProvider";
import { CardRadioButton } from "./CardFields";
import CloseSVG from "../assets/CloseSVG";
import "../Styles/CardSelect.css";

export default function SelectStatusCard() {
  const { toggleCard } = useCard();
  const { selected, updateSelected } = useStatus();

  return (
    <div className="d-flex flex-column justify-content-between" style={{ width: "70vw", height: "15vh" }}>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <p className="m-0">Status</p>

        <div onClick={toggleCard}>
          <CloseSVG />
        </div>
      </div>

      <hr className="m-0" />

      <CardRadioButton
        id="select-status-active"
        label="Active"
        name="select-status"
        checked={selected === "Active"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Active");
          }
        }}
      />
      <CardRadioButton
        id="select-status-stopped"
        label="Stopped"
        name="select-status"
        checked={selected === "Stopped"}
        onChange={event => {
          if (event.target.checked) {
            updateSelected("Stopped");
          }
        }}
      />
    </div>
  );
}
