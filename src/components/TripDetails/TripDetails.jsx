import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as tripService from "../../services/tripService";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      const tripData = await tripService.show(tripId);
      setTrip(tripData);
    };
    fetchTripDetails();
  }, [tripId]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section>
        <header>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
        </header>
      </section>
    </main>
  );
};
export default TripDetails;
