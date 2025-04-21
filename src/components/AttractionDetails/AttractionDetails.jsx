import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

import * as attractionService from "../../services/attractionService.js";
import MapView from "../MapView/MapView.jsx";

// Import micro components and styles
import {
  Heading1,
  Paragraph,
} from "../microComponents/Typography";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import ButtonTertiary from "../microComponents/ButtonTertiary/ButtonTertiary";
import DashboardBox from "../microComponents/DashboardBox/DashboardBox";
import Alert from "../microComponents/Alert/Alert"; // Import Alert for errors
import styles from "./AttractionDetails.module.css";

const AttractionDetails = ({ isViewer }) => {
  const { tripId, destinationId, attractionId } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        setError(null); // Clear previous errors
        const attractionDetails = await attractionService.showAttraction(
          tripId,
          destinationId,
          attractionId
        );
        setAttraction(attractionDetails);
      } catch (err) {
        console.error("Error fetching attraction details:", err);
        setError("Failed to load attraction details.");
        setAttraction(null);
      }
    };
    if (tripId && destinationId && attractionId) {
      fetchAttractionDetails();
    }
  }, [tripId, destinationId, attractionId]);

  const handleDeleteAttraction = async () => {
    try {
      await attractionService.deleteAttraction(
        tripId,
        destinationId,
        attractionId
      );
      // Navigate back to the destination details page
      navigate(`/trips/${tripId}/destinations/${destinationId}`);
    } catch (err) {
      console.error("Error deleting attraction:", err);
      setError("Failed to delete attraction. Please try again.");
    }
  };

  // Loading State
  if (!attraction && !error) {
    return <Paragraph>Loading attraction details...</Paragraph>;
  }

  // Error State - Render within the main layout for consistency if possible
  // Or use a dedicated error component/page

  return (
    <main className={styles.detailsContainer}>
      {/* Display error at the top if exists */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Render content only if attraction data exists */}
      {attraction && (
        <>
          {/* Attraction Info Box */}
          <DashboardBox className={styles.infoBox}>
            <Heading1>{attraction.name}</Heading1>
            {/* Display Address if available */}
            {attraction.address && <Paragraph>Address: {attraction.address}</Paragraph>}
            {/* Add other details like website, hours etc. if available in attraction object */}

            {/* Button Group inside Info Box */}
            <div className={styles.buttonGroup}>
              <ButtonSecondary
                onClick={() => navigate(`/trips/${tripId}/destinations/${destinationId}`)}
              >
                Back to Destination
              </ButtonSecondary>
              {!isViewer && (
                <ButtonTertiary onClick={handleDeleteAttraction}>
                  Delete Attraction
                </ButtonTertiary>
              )}
            </div>
          </DashboardBox>

          {/* Map View Box */}
          <DashboardBox className={styles.mapBox}>
            {/* MapView should recenter based on the attractionId from useParams */}
            <MapView />
          </DashboardBox>
        </>
      )}
      {/* Show message if attraction is null but no error (e.g., after deletion failed?) */}
      {!attraction && !error && <Paragraph>Attraction data not found.</Paragraph>}
    </main>
  );
};

export default AttractionDetails;