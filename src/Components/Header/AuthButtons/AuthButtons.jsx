import React from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import styles from "./AuthButtons.module.css";

const AuthButtons = ({ navigate, setMobileMenuOpen, mobileVersion }) => {
  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleSignup = () => {
    navigate("/signup");
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.authButtons}>
      <button
        className={`${styles.button} ${styles.loginButton}`}
        onClick={handleLogin}
      >
        <FaUser /> Sign In
      </button>
      {!mobileVersion && (
        <button
          className={`${styles.button} ${styles.signupButton}`}
          onClick={handleSignup}
        >
          <FaUserPlus /> Sign Up
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
