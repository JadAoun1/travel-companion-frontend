import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as tripService from "../../services/tripService";


const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

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

  //Delete trip function
  const handleDeleteTrip = async (tripId) => {
    const deletedTrip = await tripService.deleteTrip(tripId);
    setTrip(deletedTrip);
    navigate("/trips");
  }

  return (
    <main>
      <section>
        <header>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
          <button onClick={() => handleDeleteTrip(trip._id)}>Delete Trip</button>
        </header>
      </section>
    </main>
  );
};
export default TripDetails;
