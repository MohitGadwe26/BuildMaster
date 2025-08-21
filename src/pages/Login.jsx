// src/components/Login.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import authService from "../api/auth";
import styles from "./Login.module.css";

const Login = () => {
  const wrapperRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.verified) {
      setSuccessMessage("✅ Your email has been verified. You can now log in.");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        navigate("/");
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setResendMessage("");
    setUnverifiedEmail("");

    try {
      await authService.login({ email, password });
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";
      setError(message);

      if (message.includes("Email not verified")) {
        setUnverifiedEmail(email);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;
    try {
      await authService.resendVerification(unverifiedEmail);
      setResendMessage(
        "📧 Verification email resent. Please check your inbox."
      );
      setError("");
    } catch (err) {
      setResendMessage(
        err.response?.data?.message || "Failed to resend verification email."
      );
    }
  };

  const handleGoogleSuccess = async (res) => {
    try {
      const credential = res.credential;
      const data = await authService.googleAuth(credential);
      if (data.token) {
        navigate("/");
      }
    } catch (err) {
      console.error(err); // ✅ now it's "used"
      setError("Google login failed");
    }
  };

  const handleGoogleError = () => {
    setError("Google sign-in failed");
  };

  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.authFormContainer} ref={wrapperRef}>
        <button
          className={styles.closeBtn}
          onClick={() => navigate("/")}
          aria-label="Close login form"
        >
          <FaTimes />
        </button>

        <h2>Login</h2>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {unverifiedEmail && (
          <div className={styles.resendContainer}>
            <p>
              Didn&apos;t get the email?{" "}
              <button
                type="button"
                onClick={handleResendVerification}
                className={styles.resendLink}
              >
                Resend verification email
              </button>
            </p>
            {resendMessage && (
              <div className={styles.infoMessage}>{resendMessage}</div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
              Password
              <span className={styles.forgotWrap}>
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Forgot?
                </Link>
              </span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.btnSpinner}></span> : "Login"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <div style={{ marginBottom: 8 }}>OR</div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className={styles.signupLink}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
