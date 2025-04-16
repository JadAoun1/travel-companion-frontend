// src/components/Dashboard/Dashboard.jsx
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as tripService from "../../services/tripService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const fetchedTrips = await tripService.index();
        setTrips(fetchedTrips);
      } catch (error) {
        console.log(error);
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
      <button onClick={() => navigate("/trips/new")}>New Trip</button>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            <h2>{trip.title}</h2>
            <p>{trip.description}</p>
            <Link to={`/trips/${trip._id}`}>
              <button>View Trip</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
