import { useState } from "react";
import { useNavigate } from "react-router";
import * as tripService from "../../services/tripService";

const NewTripForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination: "",
  });

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await tripService.create(formData);
      setMessage("Trip created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Error creating trip. Please try again.");
    }
  };

  return (
    <main>
      <h1>Create a new Trip</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          name="destination"
          id="destination"
          value={formData.destination}
          onChange={handleChange}
        />

        <button type="submit">Create Trip</button>
      </form>
    </main>
  );
};

export default NewTripForm;
