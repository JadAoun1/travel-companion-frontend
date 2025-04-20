import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as tripService from "../../services/tripService";

// Import Micro Components
import InputField from "../microComponents/InputField/InputField";
import TextAreaField from "../microComponents/TextAreaField/TextAreaField"; // Import TextAreaField
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary"; // Changed from Tertiary
import { Heading2 } from "../microComponents/Typography";

// Import CSS Module
import styles from "./TripForm.module.css";

const TripForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  // const [message, setMessage] = useState(""); // Could add Alert later if needed
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const tripData = await tripService.show(tripId);
        setFormData(tripData);
      } catch (error) {
        console.log("Error fetching trip details:", error);
        // Handle error, e.g., navigate back or show message
        navigate("/trips"); // Navigate back if trip doesn't exist
      }
    };
    if (tripId) {
      fetchTripDetails();
    }
    // Reset form on unmount or tripId change
    return () => setFormData({ title: "", description: "" });
  }, [tripId, navigate]);

  const handleChange = (event) => {
    // Assuming InputField/TextAreaField pass name/value in event or event.target
    const { name, value } = event.target ? event.target : event;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (tripId) {
        await tripService.update(tripId, formData);
        navigate(`/trips/${tripId}`);
      } else {
        const newTrip = await tripService.create(formData);
        // Navigate to the new trip's page or dashboard
        navigate(`/trips/${newTrip._id}`); // Example: Navigate to the new trip detail
        // navigate("/trips"); // Or back to dashboard
      }
    } catch (error) {
      console.log("Error submitting trip:", error);
      // Add user-facing error handling here (e.g., set message state and show Alert)
    }
  };

  // Basic validation for submit button
  const isFormInvalid = () => {
    return !(formData.title && formData.description);
  };

  return (
    <main className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Heading2 className={styles.formHeader}>
          {tripId ? `Edit ${formData.title || 'Trip'}` : "Create a New Trip"}
        </Heading2>

        {/* Could add Alert component here for messages */}

        <InputField
          label="Title"
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextAreaField
          label="Description"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6} // Example: Set number of rows
        />

        <div className={styles.buttonGroup}>
          {/* Changed ButtonTertiary to ButtonSecondary */}
          <ButtonSecondary type="button" onClick={() => navigate(tripId ? `/trips/${tripId}` : '/trips')}>Cancel</ButtonSecondary>
          <ButtonPrimary type="submit" disabled={isFormInvalid()}>
            {tripId ? "Update Trip" : "Create Trip"}
          </ButtonPrimary>
        </div>
      </form>
    </main>
  );
};

export default TripForm;
