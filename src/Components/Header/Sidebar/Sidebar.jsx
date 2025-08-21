import PropTypes from "prop-types";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Profile from "../../../pages/Profile";
import Settings from "../../../pages/Settings";
import styles from "./Sidebar.module.css";

const Sidebar = ({ sidebarContent, setSidebarContent }) => {
  const sidebarRef = useRef(null);

  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebarContent} ref={sidebarRef}>
        <button
          className={styles.closeSidebarBtn}
          onClick={() => setSidebarContent(null)}
        >
          <FaTimes />
        </button>
        {sidebarContent === "profile" && <Profile />}
        {sidebarContent === "settings" && <Settings />}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarContent: PropTypes.string, // profile | settings | null
  setSidebarContent: PropTypes.func.isRequired,
};

export default Sidebar;
