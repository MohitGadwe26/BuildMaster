import React from "react";
import styles from "./MobileMenuButton.module.css";

// In MobileMenuButton.jsx - add console log to verify clicks
const MobileMenuButton = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const handleClick = () => {
    console.log("Menu button clicked"); // Debugging
    setMobileMenuOpen((open) => !open);
  };

  return (
    <button
      className={`${styles.mobileMenuBtn} ${
        mobileMenuOpen ? styles.active : ""
      }`}
      onClick={handleClick}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MobileMenuButton;
