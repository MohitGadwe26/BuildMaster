import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MobileMenuButton from "../MobileMenuButton/MobileMenuButton";
import AuthButtons from "../AuthButtons/AuthButtons";
import UserDropdown from "../UserDropdown/UserDropdown";
import styles from "./Navigation.module.css";

const Navigation = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  user,
  setSidebarContent,
  navigate,
  onLogout,
}) => {
  const location = useLocation();
  const navItems = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Services", section: "services" },
    { name: "Projects", section: "projects" },
    { name: "Pricing", section: "pricing" },
    { name: "Contact", section: "contact" },
  ];

  const getActiveNav = () => {
    const hash = window.location.hash.substring(1);
    if (hash) return hash;
    if (location.state?.section) return location.state.section;
    if (location.pathname === "/") return "home";
    return "";
  };

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate("/", { state: { section: sectionId } });

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 30;
        const elementPosition = element.offsetTop;

        window.scrollTo({
          top: elementPosition - headerHeight - 30,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  useEffect(() => {
    const handleOverlayClick = (e) => {
      if (mobileMenuOpen && e.target.classList.contains(styles.mainNav)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOverlayClick);
    return () => document.removeEventListener("click", handleOverlayClick);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <>
      {/* Mobile auth buttons */}
      <div className={styles.mobileAuthContainer}>
        {isLoggedIn ? (
          <UserDropdown
            user={user}
            setSidebarContent={setSidebarContent}
            setMobileMenuOpen={setMobileMenuOpen}
            onLogout={onLogout}
            key="mobile-user-dropdown"
          />
        ) : (
          <AuthButtons
            navigate={navigate}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
      </div>

      <MobileMenuButton
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <nav
        className={`${styles.mainNav} ${
          mobileMenuOpen ? styles.mobileOpen : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.section}>
              <a
                href={`#${item.section}`}
                className={getActiveNav() === item.section ? styles.active : ""}
                onClick={(e) => handleNavClick(item.section, e)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <div className={styles.desktopAuthContainer}>
          {isLoggedIn ? (
            <UserDropdown
              user={user}
              setSidebarContent={setSidebarContent}
              setMobileMenuOpen={setMobileMenuOpen}
              onLogout={onLogout}
              key="desktop-user-dropdown"
            />
          ) : (
            <AuthButtons
              navigate={navigate}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          )}
        </div>
      </nav>
    </>
  );
};

Navigation.propTypes = {
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  setSidebarContent: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
