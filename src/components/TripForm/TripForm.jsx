import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as tripService from "../../services/tripService";

import InputField from "../microComponents/InputField/InputField";
import TextAreaField from "../microComponents/TextAreaField/TextAreaField"; 
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary"; 
import { Heading2 } from "../microComponents/Typography";


import styles from "./TripForm.module.css";

const TripForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
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
        navigate("/trips"); 
      }
    };
    if (tripId) {
      fetchTripDetails();
    }
    
    return () => setFormData({ title: "", description: "" });
  }, [tripId, navigate]);

  const handleChange = (event) => {
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
        navigate(`/trips/${newTrip._id}`); 
      }
    } catch (error) {
      console.log("Error submitting trip:", error);
    }
  };

  const isFormInvalid = () => {
    return !(formData.title && formData.description);
  };

  return (
    <main className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Heading2 className={styles.formHeader}>
          {tripId ? `Edit ${formData.title || 'Trip'}` : "Create a New Trip"}
        </Heading2>

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
          rows={6} 
        />

        <div className={styles.buttonGroup}>
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
