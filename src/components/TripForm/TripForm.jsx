import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as tripService from "../../services/tripService";

const TripForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  //   const [message, setMessage] = useState(""); Not needed for now
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchTripDetails = async () => {
      const tripData = await tripService.show(tripId);
      setFormData(tripData);
    };
    if (tripId) {
      fetchTripDetails();
    }
    return () => setFormData({ title: "", description: "" });
  }, [tripId]);

  const handleChange = (event) => {
    // setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       await tripService.create(formData);
  //       setMessage("Trip created successfully!");
  //       navigate("/trips");
  //     } catch (error) {
  //       console.log(error);
  //       setMessage("Error creating trip. Please try again.");
  //     }
  //   };

  //   const handleUpdateTrip = async (tripId, TripFormData) => {
  //     const updatedTrip = await tripService.update(tripId, TripFormData);
  //     setTrip(
  //       tripService.map((trip) => (trip._id === tripId ? updatedTrip : trip))
  //     );
  //     navigate(`/trips/${tripId}`);
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (tripId) {
        await tripService.update(tripId, formData);
        //   setMessage("Trip updated successfully!");
        navigate(`/trips/${tripId}`);
      } else {
        await tripService.create(formData);
        //   setMessage("Trip created successfully!");
        navigate("/trips");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>{tripId ? `Edit ${formData.title}` : "Create a New Trip"}</h1>

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

        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/trips")}>
          Cancel
        </button>
      </form>
    </main>
  );
};

export default TripForm;
