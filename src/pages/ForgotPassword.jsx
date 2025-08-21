// src/pages/ForgotPassword.jsx
import { useState } from "react";
import authService from "../api/auth";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await authService.forgotPassword(email);
      setMessage(res.message || "Password reset email sent.");
      // Optionally redirect to login after a delay:
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>Forgot Password</h2>
        <p>
          Enter your registered email. We&apos;ll send a link to reset your
          password.
        </p>

        {message && <div className={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
