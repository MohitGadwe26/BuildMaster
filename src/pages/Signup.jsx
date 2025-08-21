// src/components/Signup.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaTimes } from "react-icons/fa";
import authService from "../api/auth";
import styles from "./Signup.module.css";

const Signup = () => {
  const wrapperRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // validation functions (same as before)
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z ]+$/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Please enter a valid email address";
    return "";
  };
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must contain one uppercase letter";
    if (!/[0-9]/.test(password)) return "Must contain one number";
    if (!/[!@#$%^&*]/.test(password))
      return "Must contain one special character";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name")
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      await authService.register(formData);
      // navigate to verification pending page, pass email so user can click resend
      navigate("/verification-pending", { state: { email: formData.email } });
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          "❌ Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const res = await authService.googleAuth(credentialResponse.credential);
      if (res.token) {
        localStorage.setItem("userToken", res.token);
        navigate("/");
      } else {
        setError("❌ Google login failed: No token received");
      }
    } catch (err) {
      console.error("Google auth error:", err);
      setError(
        err.response?.data?.message || "❌ Google authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        navigate("/");
    };
    const handleEscape = (e) => e.key === "Escape" && navigate("/");

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [navigate]);

  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.authFormContainer} ref={wrapperRef}>
        <button
          className={styles.closeBtn}
          onClick={() => navigate("/")}
          aria-label="Close signup form"
        >
          <FaTimes />
        </button>

        <h2>Create Account</h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* NAME */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <div className={styles.fieldError}>{errors.name}</div>
            )}
          </div>

          {/* EMAIL */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div className={styles.fieldError}>{errors.email}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            {errors.password && (
              <div className={styles.fieldError}>{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.btnSpinner}></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className={styles.loginLink}>
          Already have an account?<Link to="/login">Log in</Link>
        </div>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div className={styles.googleAuthContainer}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("❌ Google login failed")}
              shape="rectangular"
              size="large"
              text="signup_with"
            />
          </div>
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default Signup;
