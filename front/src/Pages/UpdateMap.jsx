import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceSettings } from "../store/Devices/services/devicesService";
import LoadingCompo from "../Components/LoadingCompo/LoadingCompo";
const UpdateMap = () => {
  const { isLoading, error } = useSelector((state) => state.devicesSlice);
const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const [UserReduies, setUserReduies] = useState(10);
  const [Speed, SetSpeed] = useState("");
  const [Lat, SetLat] = useState("");
  const [Long, SetLong] = useState("");
  const inputStyle = {
    fontFamily: "Montserrat",
    fontSize: "14px",
    backgroundColor: "#1F1E22",
    width: "100%",
    height: "56px",
    margin: "5px 0",
  };

  useEffect(() => {
    // Create a map instance and set its initial configuration
    const map = L.map("map").setView([30.013056, 31.208853], 13);

    // Add a basemap layer with desired color scheme
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Initial circle settings
    let circle = L.circle([30.013056, 31.208853], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: UserReduies*100,
      draggable: true,
    }).addTo(map);

    // Create feature group and add circle
    const featureGroup = L.featureGroup([circle]).addTo(map);

    // Add leaflet-draw controls for editing
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: featureGroup,
        edit: {
          selectedPathOptions: {
            maintainColor: true,
            opacity: 0.3,
          },
        },
        remove: false,
      },
      draw: false,
    });
    map.addControl(drawControl);

    // Event listener for when the circle is edited
    map.on(L.Draw.Event.EDITED, (e) => {
      e.layers.eachLayer((layer) => {
        const { lat, lng } = layer.getLatLng();
        const radius = layer.getRadius();
        SetLat(lat);
        SetLong(lng);
        console.log(`Latitude: ${lat}, Longitude: ${lng}, Radius: ${radius}`);
      });
    });

    // You can customize the map styles here
    map.getContainer().style.backgroundColor = "silver";

    return () => {
      // Cleanup
      map.remove();
    };
  }, [UserReduies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateDeviceSettings({
        device_id: id,
        speed_limit: Speed,
        geo_longitude: Long,
        geo_latitude: Lat,
        geo_radius: UserReduies,
      })
    ).unwrap()
      .then(() => {
        navigate("/home");
      });
  };

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
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <form onSubmit={handleSubmit}>
        <div>
          <p style={{ marginTop: "15px" }}>Radius</p>
          <input
            type="number"
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            onChange={(e) => setUserReduies(e.target.value)}
          />
        </div>
        <div>
          <p style={{ marginTop: "15px" }}>Speed Limit</p>
          <input
            autoFocus
            className="border border-dark p-2 rounded"
            style={inputStyle}
            onChange={(e) => SetSpeed(e.target.value)}
          />
        </div>
        <button
          style={{
            color: "white",
            width: "fit-content",
            padding: "10px 15px 10px 15px",
            borderRadius: "12px",
          }}
          type="submit"
        >
          save
        </button>
      </form>
    </>
  );
};

export default UpdateMap;
