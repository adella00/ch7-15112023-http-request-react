import React, { useEffect, useState } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchPlaces } from "../http.js";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function getPlaces() {
      try {
        const places = await fetchPlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
        });

        setAvailablePlaces(places);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    }
    getPlaces();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return <Places title="Available Places" places={availablePlaces} isLoading={isFetching} loadingText="loading places..." fallbackText="No places available." onSelectPlace={onSelectPlace} />;
}
