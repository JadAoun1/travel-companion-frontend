// src/components/Dashboard/Dashboard.jsx
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Trip Dashboard</h1>
      <p>Welcome, {user.username}</p>
      <ul></ul>
    </main>
  );
};

export default Dashboard;
