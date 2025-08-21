// import React from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.settingsHeader}>Account Settings</h2>

      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Security</h3>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Change Password</span>
          <button className={styles.settingButton}>Update</button>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Two-Factor Authentication</span>
          <button className={styles.settingButton}>Enable</button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Notifications</h3>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Email Notifications</span>
          <button className={styles.settingButton}>Configure</button>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Push Notifications</span>
          <button className={styles.settingButton}>Configure</button>
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>Preferences</h3>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Language</span>
          <button className={styles.settingButton}>English</button>
        </div>
        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Theme</span>
          <button className={styles.settingButton}>Light</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
