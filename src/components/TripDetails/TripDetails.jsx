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

  const handleDeleteTrip = async (tripId) => {
    const deletedTrip = await tripService.deleteTrip(tripId);
    setTrip(deletedTrip);
    navigate("/trips");
  }

  return (
    <main>
      <section>
        <div>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
          <button onClick={() => navigate(`/trips/${trip._id}/edit`)}>Edit Trip</button>
          <button onClick={() => handleDeleteTrip(trip._id)}>Delete Trip</button>
        </div>
        <div>
          <h2>Planned Destinations</h2>
          {/* Need to add code to display the planned destinations */}
        </div>
      </section>
    </main> 
  );
};
export default TripDetails;
