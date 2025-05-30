import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutMe from "./components/AboutMe";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsPage from "./components/ProjectsPage";
import ContactPage from "./components/ContactPage";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <>
        <style>
          {`
            html {
              scroll-behavior: smooth;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            body {
              margin: 0;
              padding: 0;
              background-color: ${theme === "light" ? "#f3f4f6" : "#1f2937"};
              color: ${theme === "light" ? "#111827" : "#f9fafb"};
              transition: background-color 0.3s, color 0.3s;
            }

            .back-to-top {
              position: fixed;
              bottom: 20px;
              right: 20px;
              padding: 10px 15px;
              border-radius: 50%;
              background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
              color: white;
              border: none;
              cursor: pointer;
              font-weight: bold;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
          `}
        </style>
        <div>
          <Navbar theme={theme} setTheme={setTheme} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Routes>
              <Route
                path="/"
                element={<HeroSection theme={theme} />}
              />
              <Route
                path="/about"
                element={<AboutMe theme={theme} />}
              />
              <Route
                path="/experience"
                element={<ExperienceSection theme={theme} />}
              />
              <Route
                path="/projects"
                element={<ProjectsPage theme={theme} />}
              />
              <Route
                path="/contact"
                element={<ContactPage theme={theme} />}
              />
            </Routes>

            <motion.button
              className="back-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              ↑ Top
            </motion.button>
          </motion.div>
        </div>
      </>
    </Router>
  );
}

export default App;