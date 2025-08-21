import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../../api/auth";
import { toast } from "react-toastify";
import styles from "./UserDropdown.module.css";

const UserDropdown = ({
  user,
  setSidebarContent,
  setMobileMenuOpen,
  onLogout,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    setUserDropdownOpen(false);
    localStorage.removeItem("userToken");
    setMobileMenuOpen(false);

    try {
      await authService.logout();
      toast.success("Logged out successfully.");
      if (typeof onLogout === "function") {
        onLogout();
      }
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err); // log it for debugging
      toast.warn("Logout request failed, but you are logged out locally.");
      if (typeof onLogout === "function") {
        onLogout();
      }
      navigate("/", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.userDropdownContainer} ref={dropdownRef}>
      <button
        className={styles.userProfileBtn}
        onClick={() => setUserDropdownOpen((prev) => !prev)}
        aria-expanded={userDropdownOpen}
      >
        <FaUser />
        <span className={styles.userName}>{user?.name || "My Account"}</span>
        {userDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {userDropdownOpen && (
        <div className={styles.userDropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              setSidebarContent("profile");
              setUserDropdownOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            <FaUser /> Profile
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              setSidebarContent("settings");
              setUserDropdownOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            <FaUser /> Settings
          </button>
          <button
            className={`${styles.dropdownItem} ${styles.logoutBtn}`}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <span className={styles.spinner} /> Logging out...
              </>
            ) : (
              <>
                <FaSignOutAlt /> Logout
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

UserDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  setSidebarContent: PropTypes.func.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
};

export default UserDropdown;
