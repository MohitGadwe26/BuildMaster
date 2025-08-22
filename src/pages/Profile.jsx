import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>User Profile</h2>
      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <label>Name:</label>
          <span>John Doe</span>
        </div>
        <div className={styles.infoItem}>
          <label>Email:</label>
          <span>john@example.com</span>
        </div>
        <div className={styles.infoItem}>
          <label>Member Since:</label>
          <span>January 2023</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
