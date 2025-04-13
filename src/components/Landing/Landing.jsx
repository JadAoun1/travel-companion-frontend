// Landing Page Component
import React from "react";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main>
      <h1>App Title</h1>
      {/* Title Suggestions: Altoura, Aurevia, Trevia? Open to more ideas! */}
      {/* <h2>Discover, Plan, and Share Your Adventures</h2> */}
      {/* <h2>Plan trips, Make memories, Stay connected! </h2> */}
      <h2>Seamless planning for unforgettable escapes. </h2>
      <p>
        Whether you're planning a solo trip or a family vacation, our platform
        is here to help you every step of the way. From finding the perfect
        destination to sharing your memories, we make travel planning easy and
        enjoyable.
      </p>
      <button onClick={() => navigate("/sign-up")}>Sign Up</button>
      <button onClick={() => navigate("/sign-in")}>Sign In</button>
    </main>
  );
};

export default Landing;
