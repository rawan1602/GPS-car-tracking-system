import React from "react";
import { Link, useParams } from "react-router-dom";

import { useCard } from "../Components/CardProvider";
import AddDeviceCard from "../Components/AddDeviceCard";
import "../Styles/Car.css";

export default function Car() {
  const { car } = useParams();

  const { updateContent: setCardContent, toggleCard } = useCard();

  return (
    <div className="d-flex flex-column justify-content-between h-100 p-3">
      <div className="d-flex flex-column align-items-start gap-5">
        <Link to="/" className="text-link" style={{ textDecoration: "none", color: "var(--gray-100)" }}>
          Back
        </Link>

        <div className="d-flex flex-column gap-1 align-items-center w-100 px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="rounded" style={{ width: 36, height: 3, backgroundColor: "var(--success)", display: "inline" }}></div>

            <span className="mx-3" style={{ color: "var(--success)", fontSize: 12 }}>
              ACTIVE NOW
            </span>
          </div>

          <p className="car-name">{car.toUpperCase()}</p>
        </div>

        <div className="d-flex justify-content-between w-100 gap-2">
          <div className="w-100 rounded p-2 text-center" style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}>
            أ س و 253
          </div>
          <div className="w-100 rounded p-2 text-center" style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}>
            Alexandria
          </div>
          <div className="w-100 rounded p-2 text-center" style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}>
            64 km - hr{" "}
          </div>
        </div>

        <div className="d-flex justify-content-between w-100 gap-2">
          <button className="btn-add-device border rounded" style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}>
            Car Report
          </button>

          <button
            className="btn-add-device rounded"
            style={{ backgroundColor: "#00ABCB", color: "white", fontSize: 12 }}
            onClick={function () {
              setCardContent(<AddDeviceCard />);
              toggleCard();
            }}
          >
            Edit Information
          </button>
        </div>
      </div>

      <Link to="/maps">
        <button className="btn-logout">Show Path On Map</button>
      </Link>
    </div>
  );
}
