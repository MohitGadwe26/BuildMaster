import { useEffect, useState } from "react";
import styles from "./Home.module.css";

import construction1 from "../assets/images/home/construction1.jpg";
import construction2 from "../assets/images/home/construction2.jpg";
import construction3 from "../assets/images/home/construction3.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: construction1, alt: "Modern construction project" },
    { image: construction2, alt: "Construction team working" },
    { image: construction3, alt: "Completed building project" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Delay to ensure mobile keyboard or soft UI closes
      setTimeout(() => {
        const yOffset = -100; // Adjust for any fixed header (if needed)
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <section id="home" className={styles.homeSection}>
      {/* Full-width background container */}
      <div className={styles.backgroundContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.backgroundSlide} ${
              index === currentSlide ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className={styles.contentWrapper}>
        <div className={styles.homeContent}>
          <h1 className={styles.heroTitle}>
            Building Tomorrow&apos;s Landmarks Today
          </h1>
          <p className={styles.motto}>
            Precision. Quality. Integrity.
            <br />
            Your vision, our expertise - constructing excellence since 1995.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => scrollToSection("projects")}
            >
              Our Projects
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => scrollToSection("about")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
