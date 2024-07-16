import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProfilePicture from "../Components/ProfilePicture";
import { useDispatch, useSelector } from "react-redux";
import { GetAlerts } from "../store/Devices/services/devicesService";
import LoadingCompo from "../Components/LoadingCompo/LoadingCompo";

export default function Alerts() {


    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    };


     const formatTime = (dateString) => {
       const date = new Date(dateString);
       const hours = date.getHours().toString().padStart(2, "0");
       const minutes = date.getMinutes().toString().padStart(2, "0");
       return `${hours}:${minutes}`;
     };

       const { isLoading, error, alertsData } = useSelector(
         (state) => state.devicesSlice
       );
  const navigate = useNavigate();

  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(GetAlerts());
  },[dispatch])


   if (isLoading) {
     return (
       <div
         style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           height: "100vh",
         }}
       >
         <LoadingCompo />
       </div>
     );
   }
   if (error) {
     return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
   }


  return (
    <div className="h-100 p-3 d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <span className="category-name" style={{ fontSize: 24 }}>
          Check Alerts
        </span>

     
      </div>
      <div
        className="dashboard-wrapper"
        style={{ backgroundColor: "transparent" }}
      >
        {/* <h3 className="w-100" style={{ color: "var(--danger)", marginBottom: "-0.5rem" }}>
      Latest Alerts
    </h3> */}

        {alertsData?.alerts?.map((el) => {
          return (
            <>
              <div
                className="py-3 px-2 w-100 d-flex align-items-center justify-content-between rounded gap-3"
                style={{ backgroundColor: "#242226" }}
              >
                <div className="d-flex align-items-center gap-5">
                  <div>
                    <p
                      className="category-name m-0"
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        letterSpacing: "10%",
                        fontFamily: "Cairo",
                        color: "#585858",
                      }}
                    >
                      {el.plate_number}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--danger)",
                      borderRadius: 50,
                      height: 33,
                      width: 1,
                    }}
                  ></div>
                </div>

                <div>
                  <p
                    className="category-name mb-1 fw-bolder"
                    style={{ fontSize: 12, color: "#747474" }}
                  >
                    {el.type_of_alert}
                  </p>

                  <p
                    className="category-name m-0 fw-bolder"
                    style={{ fontSize: 8, color: "var(--danger)" }}
                  >
                    {formatDate(el.date)}
                    
                  </p>
                  <p className="category-name m-0 fw-bolder"
                    style={{ fontSize: 8, color: "var(--danger)" }}>
                    {formatTime(el.date)}
                  </p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}




  //  <div
  //    className="dashboard-wrapper"
  //    style={{ backgroundColor: "transparent" }}
  //  >
  //    {/* <h3 className="w-100" style={{ color: "var(--danger)", marginBottom: "-0.5rem" }}>

  //       <h3
  //         className="w-100"
  //         style={{ color: "var(--light-blue)", marginBottom: "-0.5rem" }}
  //       >
  //         Older Alerts
  //       </h3>
  //       */}
  //    <div
  //      className="py-3 px-2 w-100 d-flex align-items-center justify-content-between rounded gap-3"
  //      style={{ backgroundColor: "#242226" }}
  //    >
  //      <div className="d-flex align-items-center gap-5">
  //        <div>
  //          <p
  //            className="category-name m-0 fw-bolder"
  //            style={{ fontSize: 16, textWrap: "nowrap" }}
  //          >
  //            BMW M5
  //          </p>
  //          <p
  //            className="category-name m-0"
  //            style={{
  //              fontSize: 10,
  //              fontWeight: "bold",
  //              letterSpacing: "10%",
  //              fontFamily: "Cairo",
  //              color: "#585858",
  //            }}
  //          >
  //            أ س و 253
  //          </p>
  //        </div>
  //        <div
  //          style={{
  //            backgroundColor: "#747474",
  //            borderRadius: 50,
  //            height: 33,
  //            width: 1,
  //          }}
  //        ></div>
  //      </div>

  //      <div>
  //        <p
  //          className="category-name mb-1 fw-bolder"
  //          style={{ fontSize: 12, color: "#747474" }}
  //        >
  //          exceeded speed limit Cairo Zone
  //        </p>

  //        <p
  //          className="category-name m-0 fw-bolder"
  //          style={{ fontSize: 8, color: "#747474" }}
  //        >
  //          18 min ago
  //        </p>
  //      </div>

  //      <DotsSVG />
  //    </div>
  //  </div>;