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
    const flightIcon = document.createElement("img");
    flightIcon.className = "flight-icon";
    flightIcon.src = plane;

    const intialMarker = new mapboxgl.Marker({ element: flightIcon })
      .setLngLat([lng, lat])
      .addTo(map.current);
    markers.current.push(intialMarker);
    flights.map((flight) => {
      const newMarker = new mapboxgl.Marker()
        .setLngLat([flight.lng, flight.lat])
        .addTo(map.current!)
        .setRotation(flight.dir);
      markers.current.push(newMarker);
    });
  }, []);
  return (
    <>
      <div className="container">
        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
};
export default Map;
