import React from "react";

import EditSVG from "../assets/EditSVG";
import "../Styles/Profile.css";

export default function ProfilePicture({ canEdit = false, small = false, ...props }) {
  return (
    <div className="w-100 mt-3 mb-1 d-flex justify-content-around align-items-center">
      <div className="position-relative" {...props}>
        <img src="/profileBorder.svg" alt="Profile Picture Border" className="position-absolute" style={small ? { width: 48, height: 48 } : {}} />
        <img
          alt="Profile Picture"
          src="/profile.png"
          className="position-relative"
          style={small ? { width: 40, height: 40, left: "0.25rem", top: "0.25rem" } : { left: "0.4rem", top: "0.4rem" }}
        />
        <div className="position-absolute" style={{ bottom: 0, right: 0 }}>
          {canEdit && <EditSVG />}
        </div>
      </div>
    </div>
  );
}
