import React from "react";
import styles from "./Pricing.module.css";
import { FaHome, FaBuilding, FaCity } from "react-icons/fa";

const Pricing = () => {
  return (
    <section className={styles.pricing} id="pricing">
      <h1 className={styles.heading}>Our Pricing</h1>

      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <FaHome className={styles.icon} />
          <h3>Basic Plan</h3>
          <div className={styles.price}>
            <span>$</span>250<span>/mo</span>
          </div>
          <div className={styles.list}>
            <p>Interior Design</p>
            <p>Refurbishment</p>
            <p>Material Supply</p>
            <p>Maintenance</p>
            <p>24/7 Support</p>
          </div>
          <a href="#" className={styles.btn}>
            Choose Plan
          </a>
        </div>

        <div className={styles.box}>
          <FaBuilding className={styles.icon} />
          <h3>Premium Plan</h3>
          <div className={styles.price}>
            <span>$</span>650<span>/mo</span>
          </div>
          <div className={styles.list}>
            <p>Interior Design</p>
            <p>Refurbishment</p>
            <p>Material Supply</p>
            <p>Maintenance</p>
            <p>24/7 Support</p>
          </div>
          <a href="#" className={styles.btn}>
            Choose Plan
          </a>
        </div>

        <div className={styles.box}>
          <FaCity className={styles.icon} />
          <h3>Ultimate Plan</h3>
          <div className={styles.price}>
            <span>$</span>1250<span>/mo</span>
          </div>
          <div className={styles.list}>
            <p>Interior Design</p>
            <p>Refurbishment</p>
            <p>Material Supply</p>
            <p>Maintenance</p>
            <p>24/7 Support</p>
          </div>
          <a href="#" className={styles.btn}>
            Choose Plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
