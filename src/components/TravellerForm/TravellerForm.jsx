import * as tripService from "../../services/tripService";
import * as userService from "../../services/userService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { Heading2 } from "../microComponents/Typography";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../microComponents/ButtonSecondary/ButtonSecondary";
import Alert from "../microComponents/Alert/Alert";
import DashboardBox from "../microComponents/DashboardBox/DashboardBox";
import styles from "./TravellerForm.module.css";

const TravellerForm = ({ trip, fetchTripDetails }) => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        const availableUsers = fetchedUsers.filter(user =>
          !trip?.travellers.some(traveller => traveller.user._id === user._id)
        );
        setUsers(availableUsers);
      } catch (error) {
        console.log(error);
      }
    };

    if (tripId) {
      fetchTripDetails(tripId).then(() => {
        if (trip) {
          fetchUsers();
        }
      });
    } else {
      console.error("Trip ID not found");
    }
  }, [tripId, fetchTripDetails, trip]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingTraveller = trip?.travellers.some(
      (traveller) => traveller.user.username === selectedUsers
    );
    if (existingTraveller) {
      setMessage("Traveller is already part of the trip.");
      return;
    }

    if (!selectedUsers || !role) {
      setMessage("Please select a user and a role.");
      return;
    }

    try {
      await tripService.addTraveller(tripId, { username: selectedUsers, role });
      navigate(`/trips/${tripId}`);
    } catch (error) {
      console.log(error);
      setMessage("Failed to add traveller. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <DashboardBox className={styles.formBox}>
        <Heading2>Add a Traveller</Heading2>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label htmlFor="user">Select User:</label>
            <select
              id="user"
              name="user"
              value={selectedUsers}
              onChange={(event) => {
                setSelectedUsers(event.target.value);
                setMessage("");
              }}
              required
            >
              <option value="">-- Select a user --</option>
              {users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="role">Select Role:</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(event) => {
                setRole(event.target.value)
                setMessage("");
              }}
              required
            >
              <option value="">-- Select a role --</option>
              <option value="Owner">Owner</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          {message && (
            <Alert severity="warning" style={{ marginTop: '1rem' }}>
              {message}
            </Alert>
          )}

          <div className={styles.buttonGroup}>
            <ButtonSecondary type="button" onClick={() => navigate(`/trips/${tripId}`)}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary type="submit">Add Traveller</ButtonPrimary>
          </div>
        </form>
      </DashboardBox>
    </div>
  );
};

export default TravellerForm;
