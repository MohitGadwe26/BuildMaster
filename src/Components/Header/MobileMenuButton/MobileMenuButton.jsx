import PropTypes from "prop-types";
import styles from "./MobileMenuButton.module.css";

const MobileMenuButton = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const handleClick = () => {
    console.log("Menu button clicked");
    setMobileMenuOpen((open) => !open);
  };

  return (
    <button
      className={`${styles.mobileMenuBtn} ${
        mobileMenuOpen ? styles.active : ""
      }`}
      onClick={handleClick}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

MobileMenuButton.propTypes = {
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
};

export default MobileMenuButton;
