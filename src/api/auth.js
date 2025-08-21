// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Attach JWT to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Handle unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 📝 Register user (manual signup)
const register = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data; // contains success msg & email
  } catch (error) {
    const msg = error.response?.data?.message || "Registration failed.";
    throw new Error(msg);
  }
};

// 🔑 Login user
const login = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    const { token, role = "user", user } = response.data;

    if (token) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userData", JSON.stringify(user));
    }
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Login failed.";
    throw new Error(msg);
  }
};

// 🔐 Google OAuth login
const googleAuth = async (credential) => {
  try {
    const response = await API.post("/google", { credential });
    const { token, role = "user", user } = response.data;

    if (token) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userData", JSON.stringify(user));
    }
    return response.data;
  } catch {
    throw new Error("Google login failed");
  }
};

// 📩 Verify email from token
const verifyEmail = async (token) => {
  try {
    const res = await API.get(
      `/verify-email?token=${encodeURIComponent(token)}`
    );
    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Email verification failed.";
    throw new Error(msg);
  }
};

// 🔄 Resend verification link
const resendVerification = async (email) => {
  try {
    const res = await API.post("/resend-verification", { email });
    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || "Resend verification failed.";
    throw new Error(msg);
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await API.post("/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// In auth.js - update the resetPassword function
const resetPassword = async (token, password) => {
  try {
    console.log("Sending token to backend:", token); // Debug log
    const response = await API.post(`/reset-password/${token}`, { password });
    return response.data;
  } catch (err) {
    const errorMsg =
      err.response?.data?.message ||
      "Failed to reset password. Please try again.";
    throw new Error(errorMsg);
  }
};

// 👤 Get logged-in user info
const getMe = async () => {
  try {
    const response = await API.get("/me");
    if (response.data.role) {
      localStorage.setItem("userRole", response.data.role);
    }
    return response.data;
  } catch {
    throw new Error("Failed to fetch user");
  }
};

// 🚪 Logout user
const logout = async () => {
  try {
    await API.post("/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
  }
};

// Role helpers
const getCurrentRole = () => localStorage.getItem("userRole");
const hasRole = (requiredRole) => getCurrentRole() === requiredRole;

const authService = {
  register,
  login,
  googleAuth,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
  getCurrentRole,
  hasRole,
};

export default authService;
