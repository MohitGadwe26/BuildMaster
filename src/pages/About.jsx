import aboutVideo from "../assets/images/about/about-vid.mp4";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about} id="about">
      <h1 className={styles.heading}>about us</h1>

      <div className={styles.row}>
        <div className={styles.video}>
          <video src={aboutVideo} loop muted autoPlay />
        </div>

        <div className={styles.content}>
          <h3>We will provide you the best work which you dreamt for!</h3>
          <p>
            With over a decade of experience in the construction industry, we
            specialize in delivering high-quality residential, commercial, and
            infrastructure projects. Our team is committed to turning your
            vision into reality with precision, safety, and unmatched
            craftsmanship. From concept to completion, we ensure every detail
            meets the highest standards.
          </p>
          <a href="#services" className={styles.btn}>
            read more
          </a>
        </div>
      </div>

      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <h3>10+</h3>
          <p>years of experience</p>
        </div>
        <div className={styles.box}>
          <h3>1500+</h3>
          <p>projects completed</p>
        </div>
        <div className={styles.box}>
          <h3>790+</h3>
          <p>satisfied clients</p>
        </div>
        <div className={styles.box}>
          <h3>450+</h3>
          <p>active workers</p>
        </div>
      </div>
    </section>
  );
};

export default About;
