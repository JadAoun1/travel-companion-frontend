import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as tripService from "../../services/tripService";
import * as destinationService from "../../services/destinationService";

const TripDetails = ({ trip, fetchTripDetails }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  const fetchDestinationDetails = async (tripId) => {
    try {
      const destinationData = await destinationService.index(tripId);
      setDestinations(destinationData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tripId) {
      fetchTripDetails(tripId);
      fetchDestinationDetails(tripId);
    }
  }, [tripId, fetchTripDetails]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.deleteTrip(tripId);
      navigate("/trips");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section>
        <div>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
          <button onClick={() => navigate(`/trips/${trip._id}/edit`)}>
            Edit Trip
          </button>
          <button onClick={() => handleDeleteTrip(trip._id)}>
            Delete Trip
          </button>
        </div>
        <div>
          <h2>Planned Destinations</h2>
          {destinations.length > 0 ? (
            <ul>
              {destinations.map((destination) => (
                <li key={destination._id}>
                  <h3>{destination.name}</h3>
                  <button
                    onClick={() =>
                      navigate(
                        `/trips/${tripId}/destinations/${destination._id}`
                      )
                    }
                  >
                    View Destination
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No destinations planned yet!</p>
          )}
        </div>
        <div>
          <h2>Travellers</h2>
          <ul>
            {trip.travellers.map((traveller) => (
              <li key={traveller.user._id}>
                {traveller.user.username}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate(`/trips/${tripId}/travellers/`)}>
            Add Traveller
          </button>
        </div>
      </section>
    </main>
  );
};

export default TripDetails;
