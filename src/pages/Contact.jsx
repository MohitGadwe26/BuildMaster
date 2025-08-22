import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <section className={styles.contact} id="contact">
      <h1 className={styles.heading}>Contact Us</h1>

      <div className={styles.row}>
        <div className={styles.mapContainer}>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15076.89592087332!2d72.8319697277345!3d19.14167056419224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1641716772852!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        <form>
          <h3>Get in Touch</h3>

          {/* Manager's Contact Details */}
          <div className={styles.managerInfo}>
            <p>
              <strong>Manager Email:</strong> manager@constructify.com
            </p>
            <p>
              <strong>Manager Phone:</strong> +91 98765 43210
            </p>
          </div>

          <input type="text" placeholder="Name" className={styles.box} />
          <input type="email" placeholder="Email" className={styles.box} />
          <input type="number" placeholder="Phone" className={styles.box} />
          <textarea
            placeholder="Message"
            className={styles.box}
            cols="30"
            rows="10"
          ></textarea>
          <input type="submit" value="Send Message" className={styles.btn} />
        </form>
      </div>
    </section>
  );
};

export default Contact;
