import styles from "./Services.module.css";
import service_1 from "../assets/images/services/service-1.png";
import service_2 from "../assets/images/services/service-2.png";
import service_3 from "../assets/images/services/service-3.png";
import service_4 from "../assets/images/services/service-4.png";
import service_5 from "../assets/images/services/service-5.png";
import service_6 from "../assets/images/services/service-6.png";
import service_7 from "../assets/images/services/service-7.png";
import service_8 from "../assets/images/services/service-8.png";

const Services = () => {
  const services = [
    {
      img: service_1,
      title: "building construction",
      desc: "We offer top-notch structural construction with durable materials and expert engineering.",
    },
    {
      img: service_2,
      title: "house renovation",
      desc: "Transform your home with our innovative designs and remodeling solutions.",
    },
    {
      img: service_3,
      title: "architecture design",
      desc: "Creative and functional architectural solutions tailored to your vision.",
    },
    {
      img: service_4,
      title: "material supply",
      desc: "Reliable supply of high-quality construction materials for all project sizes.",
    },
    {
      img: service_5,
      title: "construction consultant",
      desc: "Expert consultancy for planning, budgeting, and managing construction projects.",
    },
    {
      img: service_6,
      title: "interior design",
      desc: "Modern interior designs that blend aesthetics with functionality.",
    },
    {
      img: service_7,
      title: "building maintenance",
      desc: "Comprehensive maintenance services to ensure your buildings remain in top shape.",
    },
    {
      img: service_8,
      title: "building renovation",
      desc: "Upgrade your existing structures with our efficient renovation services.",
    },
  ];

  return (
    <section className={styles.services} id="services">
      <h1 className={styles.heading}>our services</h1>
      <div className={styles.boxContainer}>
        {services.map((service, index) => (
          <div className={styles.box} key={index}>
            <img src={service.img} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
