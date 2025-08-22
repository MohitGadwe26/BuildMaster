import React from "react";
import styles from "./Projects.module.css";
import { FaPlus } from "react-icons/fa";

import project_1 from "../assets/images/projects/project-1.jpg";
import project_2 from "../assets/images/projects/project-2.jpg";
import project_3 from "../assets/images/projects/project-3.jpg";
import project_4 from "../assets/images/projects/project-4.jpg";
import project_5 from "../assets/images/projects/project-5.jpg";
import project_6 from "../assets/images/projects/project-6.jpg";

const projectImages = [
  {
    src: project_1,
    title: "Dream Home",
    tags: "Construction, Design",
  },
  {
    src: project_2,
    title: "Modern Villa",
    tags: "Renovation, Architecture",
  },
  {
    src: project_3,
    title: "Corporate Office",
    tags: "Interior, Planning",
  },
  {
    src: project_4,
    title: "Luxury Apartment",
    tags: "Design, Execution",
  },
  {
    src: project_5,
    title: "Beach House",
    tags: "Concept, Build",
  },
  {
    src: project_6,
    title: "Skyscraper",
    tags: "Construction, High-rise",
  },
];

const Projects = () => {
  return (
    <section className={styles.projects} id="projects">
      <h1 className={styles.heading}>Our Projects</h1>
      <div className={styles.boxContainer}>
        {projectImages.map((project, index) => (
          <a href={project.src} className={styles.box} key={index}>
            <div className={styles.image}>
              <img src={project.src} alt={project.title} />
            </div>
            <div className={styles.content}>
              <div className={styles.info}>
                <h3>{project.title}</h3>
                <p>{project.tags}</p>
              </div>
              <FaPlus className={styles.icon} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
