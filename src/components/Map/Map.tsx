import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap, Marker } from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import plane from "./plane.png";
interface AllFlights {
  flights: any[];
}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
const Map: React.FC<AllFlights> = ({ flights }: AllFlights) => {
  const mapContainer = useRef<HTMLDivElement | any>(null);
  const markers = useRef<Marker[]>([]);
  const map = useRef<MapboxMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  console.log(flights);
  const flightIcon = document.createElement("img");
  flightIcon.className = "flight-icon";
  flightIcon.src = plane;
  console.log(flights);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    // Create a new marker.

    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });

    const intialMarker = new mapboxgl.Marker({ element: flightIcon })
      .setLngLat([lng, lat])
      .addTo(map.current);
    markers.current.push(intialMarker);
    //console.log(flights);
  }, []);

  useEffect(() => {
    flights.map((flight) => {
      const flightIcon2 = document.createElement("img");
      flightIcon2.className = "flight-icon";
      flightIcon2.src = plane;
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(`
      ${flight.aircraft_icao} alt:${flight.alt} speed:${flight.speed}  
      `);
      const newMarker = new mapboxgl.Marker({ element: flightIcon2 })
        .setLngLat([flight.lng, flight.lat])
        .addTo(map.current!)
        .setPopup(popup)
        .setRotation(flight.dir);
      markers.current.push(newMarker);
    });
  }, [flights]);

  return (
    <>
      <div className="container">
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
};
export default Map;
