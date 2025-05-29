// localStorage.removeItem("projects");  window.location.reload(); 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsPage = ({ theme = "light" }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    if (cachedProjects) {
      const parsedProjects = JSON.parse(cachedProjects);
      setProjects(parsedProjects);
      setFilteredProjects(parsedProjects);
    } else {
      setIsLoading(true);
      axios
        .get("http://localhost:8000/api/projects/")
        .then((res) => {
          console.log("API Response:", res.data);
          setProjects(res.data);
          setFilteredProjects(res.data);
          localStorage.setItem("projects", JSON.stringify(res.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(
            "Error fetching projects:",
            err.response ? err.response.data : err.message
          );
          setError(
            "Failed to fetch projects. Displaying cached data if available."
          );
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          project.tech_stack
            ? project.tech_stack.toLowerCase().includes(filter.toLowerCase())
            : false
        )
      );
    }
  }, [filter, projects]);

  const handleFilterChange = (tech) => {
    setFilter(tech);
  };

  const techStacks = [
    "all",
    ...new Set(
      projects
        .filter(
          (project) =>
            project.tech_stack && typeof project.tech_stack === "string"
        )
        .flatMap((project) => project.tech_stack.split(","))
        .map((tech) => tech.trim().toLowerCase())
        .filter((tech) => tech)
    ),
  ];

  return (
    <>
      <style>
        {`
          .projects-page {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
            background-color: ${theme === "light" ? "#f9fafb" : "#374151"};
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            min-height: calc(100vh - 60px);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
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

          .projects-page h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            position: relative;
          }

          .projects-page h2::after {
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

          .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
          }

          .filter-buttons button {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            background-color: ${theme === "light" ? "#e5e7eb" : "#4b5563"};
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
          }

          .filter-buttons button:hover {
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            color: white;
          }

          .loading-spinner, .error-message {
            font-size: 1.2rem;
            text-align: center;
            padding: 20px;
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
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

          .error-message {
            color: ${theme === "light" ? "#dc2626" : "#f87171"};
          }

          .project-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
          }

          .project-card {
            border: 1px solid ${theme === "light" ? "#e5e7eb" : "#4b5563"};
            border-radius: 8px;
            padding: 20px;
            background-color: ${theme === "light" ? "#fff" : "#4b5563"};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            text-align: left;
          }

          .project-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .project-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 15px;
          }

          .project-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }

          .project-description {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 15px;
            color: ${theme === "light" ? "#444" : "#d1d5db"};
          }

          .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
          }

          .tech-badge {
            padding: 4px 12px;
            background-color: ${theme === "light" ? "#e0f0ff" : "#4b5563"};
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            transition: background-color 0.3s, color 0.3s;
          }

          .tech-badge:hover {
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            color: white;
          }

          .project-link {
            display: inline-block;
            padding: 8px 16px;
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            transition: background-color 0.3s;
          }

          .project-link:hover {
            background-color: ${theme === "light" ? "#005bb5" : "#1e88e5"};
          }

          @media (max-width: 768px) {
            .projects-page {
              padding: 40px 15px;
            }

            .projects-page h2 {
              font-size: 1.8rem;
            }

            .project-card {
              padding: 15px;
            }

            .project-image {
              height: 150px;
            }

            .project-card h3 {
              font-size: 1.3rem;
            }

            .project-description {
              font-size: 0.95rem;
            }

            .tech-badge {
              font-size: 0.8rem;
              padding: 3px 10px;
            }

            .project-link {
              padding: 6px 12px;
              font-size: 0.9rem;
            }

            .section-divider {
              max-width: 100%;
            }

            .project-list {
              max-width: 100%;
            }
          }
        `}
      </style>
      <motion.section
        className="projects-page"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-label="Projects section"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <div className="section-divider" />
        {/* <div
          className="filter-buttons"
          role="radiogroup"
          aria-label="Project filters"
        >
          {techStacks.map((tech, index) => (
            <motion.button
              key={tech}
              onClick={() => handleFilterChange(tech)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              role="radio"
              aria-checked={filter === tech}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </motion.button>
          ))}
        </div>
        <div className="section-divider" /> */}
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              className="loading-spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Loading projects...
            </motion.div>
          ) : error ? (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.div>
          ) : filteredProjects.length > 0 ? (
            <div className="project-list" role="list">
              {filteredProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  {index > 0 && <div className="section-divider" />}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    role="listitem"
                  >
                    <div className="project-card">
                      {project.image &&
                        (project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="project-image"
                            />
                          </a>
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                          />
                        ))}
                      <h3>{project.title}</h3>
                      <p className="project-description">
                        {project.description}
                      </p>
                      {project.tech_stack ? (
                        <div className="tech-stack">
                          {project.tech_stack
                            .split(",")
                            .map((tech, techIndex) => (
                              <span key={techIndex} className="tech-badge">
                                {tech.trim() || "Unknown"}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <p className="project-description">
                          No technologies specified.
                        </p>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          Live Demo / Repo
                        </a>
                      )}
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No projects found for this filter.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default ProjectsPage;
