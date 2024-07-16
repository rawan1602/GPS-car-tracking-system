import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

import { useCard } from "../Components/CardProvider";
import SearchBar from "../Components/SearchBar";
import ProfilePicture from "../Components/ProfilePicture";
import SelectCategoryCard from "../Components/SelectCategoryCard";
import SelectStatusCard from "../Components/SelectStatusCard";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Home.css";
import "../Styles/Car.css";

export default function Reports() {
  const navigate = useNavigate();
  const { updateContent: setCardContent, toggleCard } = useCard();
  const [startDate, setStartDate] = useState(new Date());
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
          style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}
          onClick={function () {
            setCardContent(<SelectCategoryCard />);
            toggleCard();
          }}
        >
          Zone
        </div>
        <div
          className="p-2 rounded text-center w-100"
          style={{ backgroundColor: "#242424", color: "white", fontSize: 12 }}
          onClick={function () {
            setCardContent(<SelectStatusCard />);
            toggleCard();
          }}
        >
          Status
        </div>
      </div>

      <div className="dashboard-wrapper" style={{ backgroundColor: "transparent" }}>
        <div
          className="align-items-center d-flex justify-content-between px-2 py-3 rounded w-100"
          style={{ backgroundColor: "#242226" }}
          onClick={function () {
            navigate("/reports/1");
          }}
        >
          <div className="align-items-center d-flex gap-3">
            <div style={{ backgroundColor: "var(--danger)", borderRadius: 50, boxShadow: "0px 0px 10px var(--danger)", height: 33, width: 3 }}></div>
            <div>
              <p className="category-name m-0" style={{ fontSize: 16 }}>
                BMW M5
              </p>
              <p className="category-name m-0" style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "#585858" }}>
                أ س و 253
              </p>
            </div>
          </div>
          <div className="border border-dark px-2 py-1 rounded w-50" style={{ backgroundColor: "#58585840" }}>
            <div className="align-items-center d-flex justify-content-between w-100">
              <div>
                <p className="category-name m-0" style={{ fontSize: 10 }}>
                  {"Cairo"}
                </p>
                <p className="category-name m-0" style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "#585858" }}>
                  0 alerts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="align-items-center d-flex justify-content-between px-2 py-3 rounded w-100"
          style={{ backgroundColor: "#242226" }}
          onClick={function () {
            navigate("/reports/1");
          }}
        >
          <div className="align-items-center d-flex gap-3">
            <div style={{ backgroundColor: "var(--danger)", borderRadius: 50, boxShadow: "0px 0px 10px var(--danger)", height: 33, width: 3 }}></div>
            <div>
              <p className="category-name m-0" style={{ fontSize: 16 }}>
                BMW M5
              </p>
              <p className="category-name m-0" style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "#585858" }}>
                ب ن ء 190
              </p>
            </div>
          </div>
          <div className="border border-dark px-2 py-1 rounded w-50" style={{ backgroundColor: "#58585840" }}>
            <div className="align-items-center d-flex justify-content-between w-100">
              <div>
                <p className="category-name m-0" style={{ fontSize: 10 }}>
                  {"Cairo"}
                </p>
                <p
                  className="category-name m-0"
                  style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "10%", fontFamily: "Cairo", color: "var(--danger)" }}
                >
                  5 alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
