import React from "react";
import { Link,useNavigate } from "react-router-dom";
import ProfilePicture from "../Components/ProfilePicture";
import "../Styles/Profile.css";
import { STATUS } from "../data/Status";
export default function Profile() {
  const navigate = useNavigate();
  const logoutHandle = ()=>{
    STATUS.isLogged = false;
    navigate("/");
  };
  return (
    <div className="d-flex flex-column h-100 justify-content-between p-3">
      <Link to="/" className="text-link" style={{ textDecoration: "none", color: "var(--gray-100)" }}>
        Back
      </Link>

      <div>
        <ProfilePicture canEdit />

        <p className="align-items-center d-flex justify-content-around mb-1 mt-3 profile-name w-100" style={{ color: "white" }}>
          Othman Elgohary
        </p>
      </div>

      <div>
        <p style={{ color: "#585858", fontWeight: 600, letterSpacing: 1, lineHeight: "normal" }}>Contact Info</p>

        <div className="d-flex flex-column gap-1">
          <div className="contact-info-card">
            <div className="vertical-rectangle"></div>
            <div className="d-inline-flex flex-column">
              <p className="info-label">EMAIL</p>
              <p className="info-content">Othman gohary2064@gmail.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="vertical-rectangle"></div>
            <div className="d-inline-flex flex-column">
              <p className="info-label">PHONE NUMBER</p>
              <p className="info-content">+20 118 999 652</p>
            </div>
          </div>
        </div>
      </div>

      <button className="btn-logout" onClick={logoutHandle}>
        Log out
      </button>
    </div>
  );
}
