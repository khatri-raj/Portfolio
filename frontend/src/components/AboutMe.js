import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaDatabase,
  FaCode,
  FaGithub,
} from "react-icons/fa";

const skillsData = [
  {
    icon: <FaPython style={{ marginRight: "8px" }} />,
    name: "Python / Django",
    details: "Built backend APIs and web apps with Django and Python.",
    proficiency: 90,
  },
  {
    icon: <FaReact style={{ marginRight: "8px" }} />,
    name: "JavaScript / React",
    details: "Developed interactive UIs with React and modern JavaScript.",
    proficiency: 85,
  },
  {
    icon: <FaDatabase style={{ marginRight: "8px" }} />,
    name: "MySQL / PostgreSQL",
    details: "Designed and optimized relational databases.",
    proficiency: 80,
  },
  {
    icon: <FaCode style={{ marginRight: "8px" }} />,
    name: "REST APIs",
    details: "Created scalable RESTful APIs for web applications.",
    proficiency: 85,
  },
  {
    icon: <FaGithub style={{ marginRight: "8px" }} />,
    name: "Git / GitHub",
    details: "Managed version control and collaboration workflows.",
    proficiency: 90,
  },
];

const timelineData = [
  {
    year: "2025 - Present",
    title: "Full-Stack Developer",
    description: "Developed web applications using Django and React.",
  },
  {
    year: "2023 - 2025",
    title: "Master's Degree in Computer Science",
    description: "Completed postgraduate studies in Computer Science.",
  },
  {
    year: "2020-2023",
    title: "Computer Science Degree",
    description: "Graduated with a B.S. in Computer Science.",
  },
];

const AboutMe = ({ theme = "light" }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [expandedTimeline, setExpandedTimeline] = useState(null);

  const toggleSkill = (index) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  const toggleTimeline = (index) => {
    setExpandedTimeline(expandedTimeline === index ? null : index);
  };

  return (
    <>
      <style>
        {`
          .about-section {
            padding: 60px 20px;
            max-width: 1200px; /* Increased width */
            margin: 0 auto;
            text-align: center;
            background-color: ${theme === "light" ? "#f9fafb" : "#374151"};
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .section-divider {
            width: 100%;
            max-width: 600px;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              ${theme === "light" ? "#61dafb" : "#21a1f1"},
              transparent
            );
            margin: 2rem auto;
          }

          .about-section h2,
          .about-section h3 {
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            margin-bottom: 1.5rem;
            font-weight: 700;
            position: relative;
          }

          .about-section h2::after,
          .about-section h3::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            border-radius: 2px;
          }

          .about-section p {
            max-width: 800px;
            margin: 0 auto 2rem;
            line-height: 1.7;
            font-size: 1.1rem;
            opacity: 0.9;
          }

          .skills-list {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-size: 1.1rem;
            text-align: left;
            max-width: 800px;
            margin: 0 auto;
          }

          .skill-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-radius: 8px;
            background-color: ${theme === "light" ? "#fff" : "#4b5563"};
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          .skill-item:hover {
            background-color: ${theme === "light" ? "#e5e7eb" : "#6b7280"};
            transform: translateY(-2px);
          }

          .skill-details {
            padding: 12px;
            font-size: 0.95rem;
            color: ${theme === "light" ? "#444" : "#d1d5db"};
            border-left: 4px solid ${theme === "light" ? "#007bff" : "#21a1f1"};
            margin-left: 32px;
            background-color: ${theme === "light" ? "#f1f5f9" : "#374151"};
            border-radius: 4px;
          }

          .proficiency-bar {
            height: 8px;
            background-color: ${theme === "light" ? "#e5e7eb" : "#6b7280"};
            border-radius: 4px;
            margin-top: 8px;
            overflow: hidden;
          }

          .proficiency-fill {
            height: 100%;
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            transition: width 1.5s ease-in-out;
          }

          .timeline {
            list-style: none;
            padding: 0;
            text-align: left;
            max-width: 800px;
            margin: 2rem auto;
          }

          .timeline-item {
            padding: 12px;
            border-left: 4px solid ${theme === "light" ? "#007bff" : "#21a1f1"};
            margin-bottom: 12px;
            cursor: pointer;
            position: relative;
            transition: background-color 0.3s ease;
          }

          .timeline-item::before {
            content: '';
            position: absolute;
            top: 12px;
            left: -8px;
            width: 12px;
            height: 12px;
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            border-radius: 50%;
          }

          .timeline-item:hover {
            background-color: ${theme === "light" ? "#f1f5f9" : "#4b5563"};
          }

          .timeline-item h4 {
            margin: 0;
            font-size: 1.2rem;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }

          .timeline-item p {
            margin: 8px 0 0;
            color: ${theme === "light" ? "#444" : "#d1d5db"};
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            .about-section {
              padding: 40px 15px;
            }

            .about-section h2 {
              font-size: 1.8rem;
            }

            .about-section h3 {
              font-size: 1.5rem;
            }

            .about-section p {
              font-size: 1rem;
            }

            .skills-list,
            .timeline {
              max-width: 100%;
            }
          }
        `}
      </style>
      <motion.section
        id="about"
        className="about-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        role="region"
        aria-label="About me section"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I’m a Full-Stack Developer specializing in Python, Django, and React.
          Currently pursuing my Master’s in Computer Science, I enjoy creating
          scalable web apps that solve real problems. With a strong foundation
          from my Bachelor’s degree, I’m passionate about learning new
          technologies and writing clean, efficient code. Outside of tech, I
          love traveling and playing chess.
        </motion.p>
        <div className="section-divider" />
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h3>
        <ul className="skills-list" role="list">
          {skillsData.map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="skill-item"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => toggleSkill(index)}
                role="button"
                aria-expanded={expandedSkill === index}
                aria-label={`Toggle details for ${skill.name}`}
              >
                {skill.icon}
                {skill.name}
              </motion.div>
              <AnimatePresence>
                {expandedSkill === index && (
                  <motion.div
                    className="skill-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.details}
                    <div className="proficiency-bar">
                      <motion.div
                        className="proficiency-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
        <div className="section-divider" />
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Timeline
        </motion.h3>
        <ul className="timeline" role="list">
          {timelineData.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="timeline-item"
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleTimeline(index)}
                role="button"
                aria-expanded={expandedTimeline === index}
                aria-label={`Toggle details for ${item.title}`}
              >
                <h4>
                  {item.year}: {item.title}
                </h4>
                <AnimatePresence>
                  {expandedTimeline === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </>
  );
};

export default AboutMe;
