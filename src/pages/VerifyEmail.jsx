import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../api/auth";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");
  const [emailToResend, setEmailToResend] = useState("");
  const [loadingResend, setLoadingResend] = useState(false);

  const hasRun = useRef(false); // 🚀 prevent double API calls in dev

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("No token provided.");
        return;
      }
      try {
        const res = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(
          res.message || "Email verified successfully. Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login", { state: { verified: true } });
        }, 1500);
      } catch (err) {
        const errMsg =
          err.response?.data?.message || "Invalid or expired token.";
        // If backend says "Email already verified", redirect
        if (errMsg.toLowerCase().includes("already verified")) {
          navigate("/login", { state: { verified: true } });
        } else {
          setStatus("error");
          setMessage(errMsg);
        }
      }
    };
    verify();
  }, [token, navigate]);

  const handleResend = async () => {
    setLoadingResend(true);
    try {
      if (!emailToResend.trim()) {
        setMessage("Please enter your email to resend.");
        setLoadingResend(false);
        return;
      }
      await authService.resendVerification(emailToResend.trim());
      setMessage("Verification email resent. Check your inbox.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to resend verification"
      );
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className={styles.container}>
      {status === "verifying" && (
        <p className={`${styles.statusMessage} ${styles.verifying}`}>
          Verifying your email...
        </p>
      )}

      {status === "success" && (
        <div className={`${styles.statusMessage} ${styles.success}`}>
          <h3>Verified ✔</h3>
          <p>{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className={`${styles.statusMessage} ${styles.error}`}>
          <h3>Verification failed</h3>
          <p>{message}</p>
          <div className={styles.resendSection}>
            <p>If your token expired you can resend a verification email:</p>
            <input
              type="email"
              className={styles.resendInput}
              value={emailToResend}
              onChange={(e) => setEmailToResend(e.target.value)}
              placeholder="Enter your email"
            />
            <div>
              <button
                className={styles.resendButton}
                onClick={handleResend}
                disabled={loadingResend}
              >
                {loadingResend ? "Sending..." : "Resend verification email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
