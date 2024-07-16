
import { useNavigate } from "react-router-dom";
import { useCard } from "../Components/CardProvider";
import SearchBar from "../Components/SearchBar";
import ProfilePicture from "../Components/ProfilePicture";
import DoubleEllipseSVG from "../assets/DoubleEllipseSVG";
import AddDeviceCard from "../Components/AddDeviceCard";
import AddCategoryCard from "../Components/AddCategoryCard";
import AddSVG from "../assets/AddSVG";
import "../Styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetDevicesCount } from "../store/Devices/services/devicesService";
import LoadingCompo from "../Components/LoadingCompo/LoadingCompo";

export default function Home() {
        const { isLoading, error, data } = useSelector(
          (state) => state.devicesSlice
        );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateContent: setCardContent, toggleCard } = useCard();
  useEffect(()=>{
    dispatch(GetDevicesCount());
  },[dispatch])

  if(isLoading){
    return(
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <LoadingCompo/>
      </div>
    )
  }
  if (error){
    return(
      <div style={{color:"red",textAlign:"center"}}>{error}</div>
    )
  }
    return (
      <div className="d-flex flex-column  justify-content-between p-3">
        <div className="align-items-center d-flex justify-content-between">
          <div className="align-items-center d-flex gap-3">
            <img src="/eyes.svg" alt="Logo" width="60rem" />
          
          </div>

      
        </div>

        {/* <SearchBar autoFocus={false} onClick={() => navigate("/search")} /> */}

        <div className="border border-dark dashboard-wrapper p-2 rounded">
          <div className="align-items-center d-flex justify-content-between w-100">
            <p className="m-0">Dashboard</p>

            <div className="dashboard-indicators">
              <div className="h-100 w-100">
                <div
                  className="rounded"
                  style={{
                    width: 14,
                    height: 3,
                    backgroundColor: "var(--success)",
                    display: "inline-block",
                  }}
                ></div>

                <span
                  className="mx-3"
                  style={{ color: "var(--success)", fontSize: 12 }}
                >
                  Active Cars
                </span>
              </div>

              <div className="h-100 w-100">
                <div
                  className="rounded"
                  style={{
                    width: 14,
                    height: 3,
                    backgroundColor: "var(--danger)",
                    display: "inline-block",
                  }}
                ></div>

                <span
                  className="mx-3"
                  style={{ color: "var(--danger)", fontSize: 12 }}
                >
                  Stopped Cars
                </span>
              </div>
            </div>
          </div>

          <div className="category-indicators w-100">
            <div
              className="align-items-center d-flex flex-column gap-1 px-1 py-2 rounded w-50"
              style={{ border: "1px solid var(--success)" }}
            >
              <span
                style={{
                  fontSize: 32,
                  letterSpacing: 0,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {data?.on_devices}
              </span>

              <div
                className="mb-2 rounded"
                style={{
                  width: 39,
                  height: 4,
                  backgroundColor: "var(--success)",
                }}
              ></div>
            </div>

            <div
              className="align-items-center d-flex flex-column gap-1 px-1 py-2 rounded w-50"
              style={{ border: "1px solid var(--danger)" }}
            >
              <span
                style={{
                  fontSize: 32,
                  letterSpacing: 0,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {data?.off_devices}
              </span>

              <div
                className="mb-2 rounded"
                style={{
                  width: 39,
                  height: 4,
                  backgroundColor: "var(--danger)",
                }}
              ></div>
            </div>

            <div
              className="align-items-start d-flex flex-column p-2 position-relative rounded w-100"
              style={{ backgroundColor: "#001D46", gap: "0.01rem" }}
            >
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: 0,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Total Cars
              </span>
              <span
                style={{
                  fontSize: 28,
                  letterSpacing: 0,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {data?.total_devices}
              </span>

              <div className="position-absolute" style={{ top: 0, right: 0 }}>
                <DoubleEllipseSVG />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-dark dashboard-wrapper p-3 rounded">
          <div className="align-items-center d-flex justify-content-between w-100">
            <p className="m-0">Category</p>

         
          </div>

          <div className="align-items-center d-flex gap-2 w-100">
            <div className="d-flex flex-column gap-2 w-100">
              {data?.categories?.map((el) => {
                return (
                  <>
                    <div
                      className="align-items-center d-flex justify-content-between px-2 py-3 rounded"
                      style={{ backgroundColor: "#242226" }}
                      onClick={function () {
                        navigate(`/categories/${el.id}`);
                      }}
                    >
                      <div className="align-items-center d-flex gap-3">
                        <div
                          style={{
                            backgroundColor: "#FF0099",
                            width: 2,
                            height: 14,
                          }}
                        ></div>
                        <span className="category-name">
                          {el.category_name}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
              <div
                className="align-items-center d-flex justify-content-around rounded"
                style={{ backgroundColor: "#242226" }}
              >
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

        <button
          className="btn-add-device rounded"
          style={{ backgroundColor: "#00ABCB", color: "white" }}
          onClick={function () {
            setCardContent(<AddDeviceCard />);
            toggleCard();
          }}
        >
          Add New Device
        </button>
      </div>
    );
}
