import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import * as tripService from "../../services/tripService";
import * as destinationService from "../../services/destinationService";
import { UserContext } from "../../contexts/UserContext";
import MapView from "../MapView/MapView";
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  UnorderedList,
  ListItem,
} from "../microComponents/Typography";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import ButtonTertiary from "../microComponents/ButtonTertiary/ButtonTertiary";
import DashboardBox from "../microComponents/DashboardBox/DashboardBox";
import styles from "./TripDetails.module.css";

const TripDetails = ({ trip, fetchTripDetails, isViewer }) => {
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
    return <Paragraph>Loading...</Paragraph>;
  }

  const isOwner = trip.travellers.some(
    (traveller) =>
      traveller.role === "Owner" && user && traveller.user._id === user._id 
  );

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.deleteTrip(tripId);
      navigate("/trips");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDestination = async () => {
    try {
      const updatedDestinations = await destinationService.index(tripId);
      setDestinations(updatedDestinations);
    } catch (error) {
      console.log("Error fetching updated destinations:", error);
    }
  };

  return (
    <main className={styles.dashboardGrid}>
      <DashboardBox>
        <Heading1>{trip.title}</Heading1>
        <Paragraph>{trip.description}</Paragraph>
        <div>
          <ButtonSecondary onClick={() => navigate("/trips")}>
            Back
          </ButtonSecondary>

          {!isViewer && (
            <ButtonSecondary
              onClick={() => navigate(`/trips/${trip._id}/edit`)}
            >
              Edit Trip
            </ButtonSecondary>
          )}

          {isOwner && (
            <ButtonTertiary onClick={() => handleDeleteTrip(trip._id)}>
              Delete Trip
            </ButtonTertiary>
          )}
        </div>
      </DashboardBox>

      <DashboardBox className={styles.mapBox}>
        <Heading2>Map View</Heading2>
        <MapView onAddDestination={handleAddDestination} />
      </DashboardBox>

      <DashboardBox>
        <Heading2>Planned Destinations</Heading2>
        {destinations.length > 0 ? (
          <UnorderedList>
            {destinations.map((destination) => (
              <ListItem key={destination._id}>
                <Heading3>{destination.name}</Heading3>
                <ButtonPrimary
                  onClick={() =>
                    navigate(`/trips/${tripId}/destinations/${destination._id}`)
                  }
                >
                  View Destination
                </ButtonPrimary>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Paragraph>No destinations planned yet!</Paragraph>
        )}
      </DashboardBox>

      <DashboardBox>
        <Heading2>Travellers</Heading2>
        <UnorderedList>
          {trip.travellers.map((traveller) => (
            <ListItem key={traveller.user._id}>
              <Paragraph>{traveller.user.username}</Paragraph>
            </ListItem>
          ))}
        </UnorderedList>
        {!isViewer && (
          <ButtonPrimary
            onClick={() => navigate(`/trips/${tripId}/travellers/`)}
          >
            Add Traveller
          </ButtonPrimary>
        )}
      </DashboardBox>
    </main>
  );
};

export default TripDetails;
