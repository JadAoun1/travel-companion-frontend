// src/App.jsx
import { Routes, Route } from "react-router";
import { useContext } from "react";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import NewTripForm from "./components/NewTripForm/NewTripForm";
import { UserContext } from "./contexts/UserContext";
import StyleGuide from './pages/StyleGuide';
import DestinationDetails from "./components/Destination/DestinationDetails";


const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips/new" element={<NewTripForm />} />
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/destination" element={<DestinationDetails />} />
      </Routes>
    </>
  );
};

export default App;
