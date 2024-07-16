// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// export default function Maps() {
//   useEffect(() => {
//     // Create a map instance and set its initial configuration
//     const map = L.map("map").setView([30.013056, 31.208853], 13);

//     // Add a basemap layer with desired color scheme
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Add a marker to the map at the specified coordinates
//     L.marker([30.013056, 31.208853])
//       .addTo(map)
//       .bindPopup("Latitude: 30.013056, Longitude: 31.208853")
//       .openPopup();

//     // You can customize the map styles here
//     map.getContainer().style.backgroundColor = "silver";

//     return () => {
//       // Cleanup
//       map.remove();
//     };
//   }, []);

//   return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
// }




import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

export default function Maps() {
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
      radius: 1000,
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
        console.log(`Latitude: ${lat}, Longitude: ${lng}, Radius: ${radius}`);
      });
    });

    // You can customize the map styles here
    map.getContainer().style.backgroundColor = "silver";

    return () => {
      // Cleanup
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
