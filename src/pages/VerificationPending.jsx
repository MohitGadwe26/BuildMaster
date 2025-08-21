import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./VerificationPending.module.css";

const VerificationPending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Verify Your Email</h2>
        <p>
          {email ? (
            <>
              We've sent a verification link to <strong>{email}</strong>.
            </>
          ) : (
            "We've sent a verification link to your email address."
          )}
        </p>
        <p>
          Please check your inbox and click the link to verify your account.
        </p>

        <div className={styles.actions}>
          <button onClick={() => navigate("/login")} className={styles.button}>
            Go to Login
          </button>
          <button
            onClick={() => navigate("/")}
            className={styles.buttonSecondary}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
