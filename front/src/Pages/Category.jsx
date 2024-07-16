import  { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";


import ProfilePicture from "../Components/ProfilePicture";

import "../Styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { GetDevicesByCatigoryId } from "../store/Devices/services/devicesService";
import LoadingCompo from "../Components/LoadingCompo/LoadingCompo";

export default function Category() {
  const dispatch = useDispatch()
  const id = useParams()
  useEffect(()=>{
    dispatch(GetDevicesByCatigoryId({ category_id: id.category }));
  },[dispatch, id.category])


     const { categoryData, isLoading, error } = useSelector(
       (state) => state.devicesSlice
     );

  const { category: _category } = useParams();
  const category = useMemo(() => _category.charAt(0).toUpperCase() + _category.slice(1));

  const navigate = useNavigate();

console.log(categoryData?.devices);

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
          Category
        </span>


      </div>

      {/*<SearchBar autoFocus={false} onClick={() => navigate("/search")} />*/}

      {categoryData?.devices?.length>0?(
        <div className="d-flex flex-column w-100 gap-3">
        {categoryData?.devices?.map((el) => {
          console.log(el)
          return (
            <>
              <div
                className="dashboard-wrapper"
                style={{ backgroundColor: "transparent" }}
              >
                <div
                  className="py-3 px-2 w-100 d-flex align-items-center justify-content-between rounded"
                  style={{ backgroundColor: "#242226" }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        backgroundColor: "var(--success)",
                        borderRadius: 50,
                        boxShadow: "0px 0px 10px var(--success)",
                        height: 33,
                        width: 3,
                      }}
                    ></div>
                    <div>
                      <p className="category-name m-0" style={{ fontSize: 16 }}>
                        {el.car_name}
                      </p>
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
                  </div>
                  <div
                    style={{ color: "white" }}
                    onClick={() => navigate(`/Map/${el.plate_number}`)}
                  >
                    Show On Map
                  </div>
                  <div
                    style={{ color: "white" }}
                    onClick={() => navigate(`/Update/${el.device_id}`)}
                  >
                    Edit Map
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      ):(
        <div style={{textAlign:"center",color:"white"}}>no cars to show</div>
      )}
      
    </div>
  );
}
