// src/App.jsx
import { Routes, Route } from "react-router";
// Adding useCallback to help with persistent 304
import { useContext, useState, useCallback } from "react";

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
import AttractionDetails from "./components/AttractionDetails/AttractionDetails";
import * as tripService from "./services/tripService";
import MapView from './components/MapView/MapView.jsx';
import TravellerForm from "./components/TravellerForm/TravellerForm";

const App = () => {
  const { user } = useContext(UserContext);
  const [trip, setTrip] = useState(null);

  const fetchTripDetails = useCallback(async (tripId) => {
    try {
      const tripData = await tripService.show(tripId);
      setTrip(tripData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const isViewer = useCallback(
    (trip) =>
      trip?.travellers.some(  
        (traveller) =>
          traveller.role === "Viewer" && user && traveller.user._id === user._id
      ),
    [user]
  );

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
            <TripDetails
              trip={trip}
              fetchTripDetails={fetchTripDetails}
              isViewer={isViewer(trip)}
            />
          }
        />
        <Route path="/trips/:tripId/edit" element={<TripForm />} />
        <Route path="/trips/:tripId/destinations/:destinationId" element={<DestinationDetails isViewer={isViewer(trip)}/>} />
        <Route path="/trips/:tripId/destinations/:destinationId/attractions/:attractionId" element={<AttractionDetails isViewer={isViewer(trip)}/>} />
        <Route path="/trips/:tripId/travellers" element={<TravellerForm trip={trip} fetchTripDetails={fetchTripDetails} />} />
        <Route path='/map' element={<MapView isViewer={isViewer(trip)} />} />
      </Routes>
    </>
  );
};

export default App;
