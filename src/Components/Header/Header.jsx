import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../api/auth";
import styles from "./Header.module.css";
import Logo from "./Logo/Logo";
import Navigation from "./NavItems/Navigation";
import Sidebar from "./Sidebar/Sidebar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarContent, setSidebarContent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      try {
        const response = await authService.getMe();
        setIsLoggedIn(true);
        setUser(response.user);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navElement = document.querySelector(`.${styles.headerContainer}`);
      if (navElement && !navElement.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className={styles.header}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          fontSize: "14px",
          maxWidth: "90vw",
          backgroundColor: "var(--primary)",
          color: "var(--light)",
        }}
      />

      <div className={styles.headerContainer}>
        <Logo navigate={navigate} />

        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isLoggedIn={isLoggedIn}
          user={user}
          setSidebarContent={setSidebarContent}
          navigate={navigate}
          onLogout={() => {
            setIsLoggedIn(false);
            setUser(null);
            setMobileMenuOpen(false); // Ensure mobile menu closes
            setSidebarContent(null); // Close sidebar if open
          }}
        />
      </div>

      {sidebarContent && (
        <Sidebar
          sidebarContent={sidebarContent}
          setSidebarContent={setSidebarContent}
          user={user}
        />
      )}
    </header>
  );
};

export default Header;
