//boilerplate for react ts functional component
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Map from "../../components/Map/Map";
import axios from "axios";

const HomePage: React.FC = () => {
  const [flights, setFlights] = useState<any>([]);
  const getFlights = async () => {
    await axios
      .get(
        `https://airlabs.co/api/v9/flights?api_key=${
          import.meta.env.VITE_FLIGHT_TRACKER_KEY
        }`
      )
      .then((response) => {
        setFlights(response.data?.response);
      });
  };
  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div>
      <h1 className="logo">Aerotracker</h1>
      <Map flights={flights} />
    </div>
  );
};
export default HomePage;
