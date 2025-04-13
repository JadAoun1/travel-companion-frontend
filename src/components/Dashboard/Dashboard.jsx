// src/components/Dashboard/Dashboard.jsx
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as tripService from "../../services/tripService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const fetchedTrips = await tripService.index();
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    if (user) {
      fetchTrips();
    }
  }, [user]);

  return (
    <main>
      <h1>Trip Dashboard</h1>
      <p>Welcome, {user.username}</p>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            {/* Maybe just keep trip title as a card on dashboard page and move description and other relevant details to the show page. */}
            <h2>{trip.title}</h2>
            <p>{trip.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
