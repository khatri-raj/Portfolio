import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ExperienceSection = ({ theme = "light" }) => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedExperiences = localStorage.getItem("experiences");
    if (cachedExperiences) {
      setExperiences(JSON.parse(cachedExperiences));
    } else {
      setIsLoading(true);
      axios
        .get("http://localhost:8000/api/experiences/")
        .then((res) => {
          setExperiences(res.data);
          localStorage.setItem("experiences", JSON.stringify(res.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching experiences:", err);
          setError("Failed to fetch experiences. Displaying cached data if available.");
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <style>
        {`
          .experience-section {
            padding: 60px 20px;
            max-width: 1200px; /* Matches AboutMe width */
            margin: 0 auto;
            background-color: ${theme === "light" ? "#f9fafb" : "#374151"};
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            min-height: calc(100vh - 60px);
            text-align: center;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .section-divider {
            width: 100%;
            max-width: 600px;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              ${theme === "light" ? "#007bff" : "#21a1f1"},
              transparent
            );
            margin: 2rem auto;
          }

          .experience-section h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            position: relative;
          }

          .experience-section h2::after {
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

          .experience-card {
            margin-bottom: 2rem;
            padding: 20px;
            border-radius: 12px;
            background-color: ${theme === "light" ? "#fff" : "#4b5563"};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            text-align: left;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            transition: all 0.3s ease;
          }

          .experience-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .experience-card h3 {
            margin-bottom: 0.5rem;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-size: 1.5rem;
            font-weight: 600;
          }

          .experience-card span,
          .experience-card p {
            color: ${theme === "light" ? "#444" : "#d1d5db"};
            margin-bottom: 0.5rem;
            display: block;
            font-size: 1rem;
            line-height: 1.5;
          }

          .experience-card span strong {
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }

          .loading-spinner, .error-message {
            font-size: 1.2rem;
            text-align: center;
            padding: 20px;
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .error-message {
            color: ${theme === "light" ? "#dc2626" : "#f87171"};
          }

          .loading-spinner::after {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 10px;
            border: 3px solid ${theme === "light" ? "#007bff" : "#21a1f1"};
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .experience-section {
              padding: 40px 15px;
            }

            .experience-section h2 {
              font-size: 1.8rem;
            }

            .experience-card {
              padding: 15px;
            }

            .experience-card h3 {
              font-size: 1.3rem;
            }

            .experience-card span,
            .experience-card p {
              font-size: 0.95rem;
            }

            .section-divider {
              max-width: 100%;
            }
          }
        `}
      </style>
      <motion.section
        className="experience-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        role="region"
        aria-label="Experience section"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        <div className="section-divider" />
        {isLoading ? (
          <motion.div
            className="loading-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading experiences...
          </motion.div>
        ) : error ? (
          <>
            <div className="section-divider" />
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          </>
        ) : experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <React.Fragment key={exp.id}>
              {index > 0 && <div className="section-divider" />}
              <motion.div
                className="experience-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3>{exp.role}</h3>
                <span><strong>Company:</strong> {exp.company}</span>
                <span><strong>Location:</strong> {exp.city || "N/A"}</span>
                <span><strong>Start Date:</strong> {exp.start_date}</span>
                <span><strong>End Date:</strong> {exp.end_date || "Present"}</span>
                <p>{exp.description}</p>
              </motion.div>
            </React.Fragment>
          ))
        ) : (
          <>
            <div className="section-divider" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No experiences available.
            </motion.p>
          </>
        )}
      </motion.section>
    </>
  );
};

export default ExperienceSection;