// Landing Page Component
import React from "react";
import { useNavigate } from "react-router";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
// Import specific typography components from the directory's index.js
import { Heading1, Heading2, Strong } from "../microComponents/Typography";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.landingContainer}>
      <Heading1 className={styles.title}>
        App Title
      </Heading1>
      <Heading2 className={styles.subtitle}>
        Seamless planning for unforgettable escapes.
      </Heading2>
      <Strong className={styles.description}>
        Whether you're planning a solo trip or a family vacation, our platform
        is here to help you every step of the way. From finding the perfect
        destination to sharing your memories, we make travel planning easy and
        enjoyable.
      </Strong>
      <ButtonPrimary onClick={() => navigate("/sign-up")}>Get Started</ButtonPrimary>
    </main>
  );
};

export default Landing;
