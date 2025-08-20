import React from "react";
import { GiHammerNails } from "react-icons/gi";
import styles from "./Logo.module.css";

const Logo = ({ navigate }) => {
  return (
    <div className={styles.logo} onClick={() => navigate("/")}>
      <GiHammerNails className={styles.logoIcon} />
      <h1>
        Build<span>Master</span>
      </h1>
    </div>
  );
};

export default Logo;
