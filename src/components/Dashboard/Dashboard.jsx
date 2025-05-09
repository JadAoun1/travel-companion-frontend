import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as tripService from "../../services/tripService";

import { Heading2, Paragraph, Link as TypographyLink } from "../microComponents/Typography";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import DashboardBox from "../microComponents/DashboardBox/DashboardBox";
import NavLink from "../microComponents/NavLink/NavLink";

import styles from "./Dashboard.module.css";

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

  if (!user) {
    return <div>Loading...</div>;
  }

  const createTripButton = (
    <ButtonPrimary onClick={() => navigate("/trips/new")}>Create New Trip</ButtonPrimary>
  );

  return (
    <main className={styles.dashboardGrid}>
      <DashboardBox
        title="MY TRIPS"
        className={styles.myTrips}
        rightElement={createTripButton}
      >
        <ul className={styles.tripListInsideBox}>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <li key={trip._id} className={styles.tripListItem}>
                <div className={styles.tripListItemContent}>
                  <Heading2>{trip.title}</Heading2>
                  <Paragraph>{trip.description.substring(0, 50)}...</Paragraph>
                </div>
                <div className={styles.tripListItemActions}>
                  <NavLink to={`/trips/${trip._id}`} variant="button">View</NavLink>
                </div>
              </li>
            ))
          ) : (
            <Paragraph>No trips yet!</Paragraph>
          )}
        </ul>
      </DashboardBox>

      <DashboardBox title="CURRENT TRIP" className={styles.currentTrip}>
        <div className={styles.placeholderContent}>No current trip details available.</div>
      </DashboardBox>
    </main>
  );
};

export default Dashboard;
