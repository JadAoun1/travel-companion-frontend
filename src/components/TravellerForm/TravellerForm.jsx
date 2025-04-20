import * as tripService from "../../services/tripService";
import * as userService from "../../services/userService";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

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
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
    fetchTripDetails(tripId);
  }, [tripId, fetchTripDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // This check should now remove ability to add same user multiple times.
    const existingTraveller = trip.travellers.some(
      (traveller) => traveller.user.username === selectedUsers
    );
    if (existingTraveller) {
      setMessage("Traveller is already part of the trip.");
      return;
    }

    try {
      // Send username instead of userId
      await tripService.addTraveller(tripId, { username: selectedUsers, role });
      navigate(`/trips/${tripId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Add a Traveller</h1>
      <form onSubmit={handleSubmit}>
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
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>

        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
        >
          <option value="">Select a role</option>
          <option value="Owner">Owner</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        {message && <p>{message}</p>}

        <button type="submit">Add Traveller</button>
        <button type="button" onClick={() => navigate(`/trips/${tripId}`)}>
          Cancel
        </button>
      </form>
    </main>
  );
};

export default TravellerForm;
