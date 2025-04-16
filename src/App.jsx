// src/App.jsx
import { Routes, Route } from "react-router";
import { useContext, useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import TripForm from "./components/TripForm/TripForm";
import { UserContext } from "./contexts/UserContext";
import StyleGuide from "./pages/StyleGuide";
import TripDetails from "./components/TripDetails/TripDetails";
import DestinationDetails from "./components/Destination/DestinationDetails";
import * as tripService from "./services/tripService";
import * as destinationService from "./services/destinationService";

const App = () => {
  const { user } = useContext(UserContext);
  const [trip, setTrip] = useState(null);

  const fetchTripDetails = async (tripId) => {
    try {
      const tripData = await tripService.show(tripId);
      setTrip(tripData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/trips" element={<Dashboard />} />
        <Route path="/trips/new" element={<TripForm />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route
          path="/trips/:tripId"
          element={
            <TripDetails trip={trip} fetchTripDetails={fetchTripDetails} />
          }
        />
        <Route path="/trips/:tripId/edit" element={<TripForm />} />
        <Route
          path="/trips/:tripId/destinations/:destinationId"
          element={<DestinationDetails />}
        />
      </Routes>
    </>
  );
};

export default App;
