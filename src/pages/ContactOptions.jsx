import { useState } from "react";
import styles from "./ContactOptions.module.css";
import { FaPhone, FaComments, FaEnvelope } from "react-icons/fa";

const ContactOptions = () => {
  const [activeTab, setActiveTab] = useState(null);

  const contactMethods = [
    {
      id: "call",
      icon: <FaPhone />,
      title: "Call us at 1-866-983-8582",
      description: "Available 7am-11pm CT, 7 days a week",
      buttonText: "Call us",
      action: () => (window.location.href = "tel:18669838582"),
    },
    {
      id: "chat",
      icon: <FaComments />,
      title: "Chat with a specialist",
      description: "Available 7am-11pm CT, 7 days a week",
      buttonText: "Chat now",
      action: () => setActiveTab("chat"),
    },
    {
      id: "email",
      icon: <FaEnvelope />,
      title: "Send us an email",
      description: "We'd love to hear from you!",
      buttonText: "Email us",
      action: () => (window.location.href = "mailto:support@company.com"),
    },
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Need More Help?</h1>
          <p className={styles.subtitle}>
            Choose your preferred way to get in touch with us
          </p>
        </div>

        <div className={styles.contactGrid}>
          {contactMethods.map((method) => (
            <div key={method.id} className={styles.contactCard}>
              <div className={styles.iconContainer}>{method.icon}</div>
              <h3 className={styles.cardTitle}>{method.title}</h3>
              <p className={styles.cardDescription}>{method.description}</p>
              <button className={styles.contactButton} onClick={method.action}>
                {method.buttonText}
              </button>
            </div>
          ))}
        </div>

        {activeTab === "chat" && (
          <div className={styles.chatModal}>
            <div className={styles.chatContent}>
              <h3>Chat Support</h3>
              <p>Our chat specialists are available to help you.</p>
              <button
                className={styles.closeButton}
                onClick={() => setActiveTab(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactOptions;
