import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import * as tripService from "../../services/tripService";
import * as destinationService from "../../services/destinationService";
import { UserContext } from "../../contexts/UserContext";
import MapView from "../MapView/MapView";

const TripDetails = ({ trip, fetchTripDetails }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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

  // Check to see if user is in travellers and is the owner of the trip 
  // Adding so only owner can delete the complete trip. 
  const isOwner = trip.travellers.some(
    (traveller) =>
      traveller.role === "Owner" && traveller.user._id === user._id
  );


  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.deleteTrip(tripId);
      navigate("/trips");
    } catch (error) {
      console.log(error);
    }
  };

    // Since destinations is referenced in trip (versus embedded like references in destinations), we need an async function to call on the backend, then update state (conversely, attractions is embedded in destinations, we already have the primary destination object accessible in state, so we just update it right then and there)
    const handleAddDestination = async () => {
        try {
            const updatedDestinations = await destinationService.index(tripId);
            setDestinations(updatedDestinations);
        } catch (error) {
            console.log("Error fetching updated destinations:", error);
        }
    };
    
  return (
    <main>
      <section>
        <div>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
          <button onClick={() => navigate("/trips")}>Back</button>
          <button onClick={() => navigate(`/trips/${trip._id}/edit`)}>
            Edit Trip
          </button>

          {isOwner && (
            <button onClick={() => handleDeleteTrip(trip._id)}>
              Delete Trip
            </button>
          )}
        </div>
        <div>
              <p>Where do you want to travel to?</p>

              <MapView onAddDestination={handleAddDestination}/>
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
            <>
                <p>No destinations planned yet!</p>
            </>
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
