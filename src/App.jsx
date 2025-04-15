// src/App.jsx
import { Routes, Route } from "react-router";
import { useContext } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import TripForm from "./components/TripForm/TripForm";
import { UserContext } from "./contexts/UserContext";
import StyleGuide from './pages/StyleGuide';
import TripDetails from "./components/TripDetails/TripDetails"; 

const App = () => {
  const { user } = useContext(UserContext);
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
        <Route path="/trips/:tripId" element={<TripDetails />} />
        <Route path="/trips/:tripId/edit" element={<TripForm />} />
      </Routes>
    </>
  );
};

export default App;
