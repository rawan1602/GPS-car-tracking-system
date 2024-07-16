import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCategory } from "../Components/SelectCategoryProvider";
import { useStatus } from "../Components/SelectStatusProvider";
import { useCard } from "../Components/CardProvider";
import SearchBar from "../Components/SearchBar";
import ProfilePicture from "../Components/ProfilePicture";
import SelectCategoryCard from "../Components/SelectCategoryCard";
import SelectStatusCard from "../Components/SelectStatusCard";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function Report() {
  const { selected: selectedCategory } = useCategory();
  const { selected: selectedStatus } = useStatus();
  const { updateContent: setCardContent, toggleCard } = useCard();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
    setCardContent(
      <div className="card-content">
        <DatePicker selected={startDate} onChange={handleDateChange} />
      </div>
    );
    toggleCard();
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
    toggleCard();
  };
  const handleDateChange = (date) => {
    setStartDate(date);
    closeDatePicker();
  };

  return (
    <div className="d-flex flex-column gap-4 h-100 p-3">
      <div className="align-items-center d-flex justify-content-between">
        <span className="category-name" style={{ fontSize: 24 }}>
          My Reports
        </span>

      </div>

      <SearchBar autoFocus={false} onClick={() => navigate("/search")} />

      <div className="d-flex gap-2 justify-content-between w-100">
      <div
          className="p-2 rounded text-center w-100"
          style={{ backgroundColor: "#242424", color: "white", fontSize: 12, cursor: "pointer" }}
          onClick={openDatePicker}
        >
          Date
        </div>
        <div
          className="p-2 rounded text-center w-100"
          style={{ backgroundColor: Boolean(selectedCategory) ? "var(--light-blue)" : "#242424", color: "white", fontSize: 12 }}
          onClick={function () {
            setCardContent(<SelectCategoryCard />);
            toggleCard();
          }}
        >
          {Boolean(selectedCategory) ? selectedCategory : "Zone"}
        </div>
        <div
          className="p-2 rounded text-center w-100"
          style={{ backgroundColor: Boolean(selectedStatus) ? "var(--light-blue)" : "#242424", color: "white", fontSize: 12 }}
          onClick={function () {
            setCardContent(<SelectStatusCard />);
            toggleCard();
          }}
        >
          {Boolean(selectedStatus) ? selectedStatus : "Status"}
        </div>
      </div>

      <div className="dashboard-wrapper rounded" style={{ backgroundColor: "#242226" }}>
        <div className="align-items-start d-flex flex-column gap-1 w-100">
          <div className="align-items-center d-flex justify-content-between px-2 py-3 rounded w-100">
            <div className="align-items-center d-flex gap-3 w-50">
              <div style={{ backgroundColor: "var(--success)", borderRadius: 50, boxShadow: "0px 0px 10px var(--success)", height: 33, width: 3 }}></div>
              <div>
                <p className="category-name m-0" style={{ fontSize: 16 }}>
                  BMW M5
                </p>
                <p className="category-name m-0" style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "#585858" }}>
                  أ س و 253
                </p>
              </div>
            </div>
            <div className="border border-dark px-2 py-1 rounded w-50">
              <div className="align-items-center d-flex justify-content-end w-100">
                <div>
                  <p className="category-name m-0" style={{ fontSize: 10, color: "var(--success)" }}>
                    Friday
                  </p>
                  <p className="category-name m-0" style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "#585858" }}>
                    <span style={{ color: "white" }}>16</span> Jun
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="align-items-start d-flex flex-column pb-3 px-2" style={{ gap: "0.5rem" }}>
            <p className="m-0" style={{ fontSize: 12, color: "#585858" }}>
              Geographical Zone: <span style={{ color: "white" }}>Alex</span>
            </p>
            <p className="m-0" style={{ fontSize: 12, color: "#585858" }}>
              Speed Limit: <span style={{ color: "white" }}>64 km - hr</span>
            </p>
            <p className="m-0" style={{ fontSize: 12, color: "#585858" }}>
              Number of Alerts: <span style={{ color: "white" }}>2 Alerts</span>
            </p>
          </div>

          <div className="align-items-start d-flex flex-column pb-3 px-2" style={{ gap: "0.1rem" }}>
            <p className="m-0" style={{ fontSize: 10, color: "var(--danger)" }}>
              Exceeding speed limit (02)
            </p>
            <p className="m-0" style={{ fontSize: 10, color: "var(--danger)" }}>
              Exceeding approved geographical boundaries (01)
            </p>
          </div>

          <div className="align-items-start d-flex flex-column pb-3 px-2 w-100" style={{ gap: "0.1rem" }}>
            <Link className="w-100" to="/maps">
              <button className="btn-logout">Show Path On Map</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
