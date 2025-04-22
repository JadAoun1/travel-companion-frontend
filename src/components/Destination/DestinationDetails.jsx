import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import * as destinationService from "../../services/destinationService.js";
import MapView from "../MapView/MapView.jsx";

import {
  Heading1,
  Heading2,
  Paragraph,
  UnorderedList,
  ListItem,
} from "../microComponents/Typography";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import ButtonTertiary from "../microComponents/ButtonTertiary/ButtonTertiary";
import DashboardBox from "../microComponents/DashboardBox/DashboardBox";
import styles from "./DestinationDetails.module.css";

const DestinationDetails = ({ isViewer }) => {
  const { tripId, destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        setError(null);
        const destinationData = await destinationService.showDestination(
          tripId,
          destinationId
        );
        setDestination(destinationData);
      } catch (err) {
        console.error("Error fetching destination details:", err);
        setError("Failed to load destination details.");
        setDestination(null);
      }
    };
    if (tripId && destinationId) {
      fetchDestinationDetails();
    }
  }, [tripId, destinationId]);

  const handleDeleteDestination = async () => {
    try {
      await destinationService.deleteDestination(tripId, destinationId);
      navigate(`/trips/${tripId}`);
    } catch (err) {
      console.error("Error deleting destination:", err);
      setError("Failed to delete destination.");
    }
  };

  const handleAddAttraction = (newAttraction) => {
    setDestination((prev) => ({
      ...prev,
      attractions: [...prev.attractions, newAttraction],
    }));
  };

  if (!destination && !error) {
    return <Paragraph>Loading destination details...</Paragraph>;
  }

  if (error) {
    return <Paragraph>Error: {error}</Paragraph>;
  }

  if (!destination) {
    return <Paragraph>Destination data not found.</Paragraph>;
  }

  return (
    <main className={styles.detailsGrid}>
      <DashboardBox className={styles.infoBox}>
        <Heading1>{destination.name}</Heading1>
        <div>
          {" "}
          <ButtonSecondary onClick={() => navigate(`/trips/${tripId}`)}>
            Back to Trip
          </ButtonSecondary>

          {!isViewer && (
            <ButtonTertiary onClick={handleDeleteDestination}>
              Delete Destination
            </ButtonTertiary>
          )}
        </div>
      </DashboardBox>

      <DashboardBox className={styles.mapBox}>
        <Heading2>Add Attractions</Heading2>
        <Paragraph>
          Search for places to add to your itinerary for {destination.name}.
        </Paragraph>
        <MapView onAddAttraction={handleAddAttraction} />
      </DashboardBox>

      <DashboardBox className={styles.attractionsBox}>
        <Heading2>Planned Attractions</Heading2>
        {destination.attractions && destination.attractions.length > 0 ? (
          <UnorderedList>
            {destination.attractions.map((attraction) => (
              <ListItem key={attraction._id} className={styles.attractionItem}>
                <Paragraph>{attraction.name}</Paragraph>
                <ButtonPrimary
                  onClick={() =>
                    navigate(
                      `/trips/${tripId}/destinations/${destinationId}/attractions/${attraction._id}`
                    )
                  }
                >
                  View Attraction
                </ButtonPrimary>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Paragraph>
            No attractions added yet for {destination.name}!
          </Paragraph>
        )}
      </DashboardBox>
    </main>
  );
};

export default DestinationDetails;
