import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const HeroSection = ({ theme = "light" }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <>
      <style>
        {`
          .hero-section {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 40px;
            background: linear-gradient(135deg, 
              ${theme === "light" ? "#e0f0ff" : "#374151"} 0%, 
              ${theme === "light" ? "#f0f8ff" : "#4b5563"} 100%);
            min-height: 100vh;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            flex-wrap: wrap;
            gap: 40px;
            box-sizing: border-box;
          }

          .hero-content {
            display: flex;
            align-items: center;
            justify-content: space-around;
            max-width: 1200px;
            width: 100%;
            gap: 40px;
            flex-wrap: wrap;
          }

          .intro-text {
            max-width: 600px;
            text-align: left;
            flex: 1;
            min-width: 300px;
          }

          .intro-text h1 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }

          .intro-text p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0.9;
          }

          .typed-text {
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
            font-weight: bold;
            display: inline-block;
            min-height: 1.5em;
            vertical-align: middle;
            position: relative;
            overflow: hidden;
            white-space: nowrap;
          }

          .typed-text::before {
            content: "Full Stack Developer";
            animation: typing 8s steps(30, end) infinite;
          }

          @keyframes typing {
            0%, 20% { content: "Full Stack Developer"; width: 100%; }
            25%, 45% { content: "Problem Solver"; width: 100%; }
            50%, 70% { content: "Tech Enthusiast"; width: 100%; }
            75%, 100% { content: "Full Stack Developer"; width: 100%; }
          }

          .hero-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
          }

          .hero-buttons a {
            padding: 12px 24px;
            font-size: 1rem;
            font-weight: 600;
            text-decoration: none;
            border-radius: 5px;
            color: white;
            text-align: center;
            min-width: 140px;
            transition: background-color 0.3s ease;
          }

          .hero-buttons a:nth-child(1) {
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .hero-buttons a:nth-child(1):hover {
            background-color: ${theme === "light" ? "#005bb5" : "#1e88e5"};
          }

          .hero-buttons a:nth-child(2) {
            background-color: ${theme === "light" ? "#6b7280" : "#9ca3af"};
          }

          .hero-buttons a:nth-child(2):hover {
            background-color: ${theme === "light" ? "#4b5563" : "#6b7280"};
          }

          .hero-buttons a:nth-child(3) {
            background-color: ${theme === "light" ? "#10b981" : "#34d399"};
            position: relative;
            overflow: hidden;
          }

          .hero-buttons a:nth-child(3):hover {
            background-color: ${theme === "light" ? "#059669" : "#22c55e"};
          }

          .hero-buttons a.downloading::after {
            content: "✓ Downloaded";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${theme === "light" ? "#10b981" : "#34d399"};
            color: white;
            font-size: 0.9rem;
            animation: fadeInOut 2s ease-in-out;
          }

          @keyframes fadeInOut {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }

          .hero-photo {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 300px;
          }

          .hero-photo img {
            width: 400px;
            height: 400px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid ${theme === "light" ? "#007bff" : "#21a1f1"};
            box-shadow: 0 0 20px ${theme === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"};
            background-color: ${theme === "light" ? "#fff" : "#4b5563"};
          }

          .social-links {
            display: flex;
            gap: 20px;
            margin-top: 2rem;
            justify-content: flex-start;
          }

          .social-links a {
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-size: 2rem;
            transition: color 0.3s ease;
          }

          .social-links a:hover {
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          @media (max-width: 1024px) {
            .hero-content {
              flex-direction: column;
              text-align: center;
              gap: 30px;
            }

            .intro-text {
              text-align: center;
            }

            .social-links {
              justify-content: center;
            }

            .hero-photo img {
              width: 300px;
              height: 300px;
            }
          }

          @media (max-width: 768px) {
            .hero-section {
              padding: 60px 20px;
              min-height: auto;
            }

            .intro-text h1 {
              font-size: 2.2rem;
            }

            .intro-text p {
              font-size: 1.1rem;
            }

            .hero-buttons {
              justify-content: center;
            }

            .hero-photo img {
              width: 250px;
              height: 250px;
            }
          }

          @media (max-width: 480px) {
            .intro-text h1 {
              font-size: 1.8rem;
            }

            .hero-photo img {
              width: 200px;
              height: 200px;
            }
          }
        `}
      </style>
      <section id="home" className="hero-section" aria-label="Hero section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="intro-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Hi, I'm Raj — <span className="typed-text"></span></h1>
            <p>Building modern web applications with Django & React.</p>
            <div className="hero-buttons">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/projects" role="button" aria-label="View projects">
                  View Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" role="button" aria-label="Contact me">
                  Contact Me
                </Link>
              </motion.div>
              <motion.a
                href="/resume.pdf"
                download
                className={isDownloading ? "downloading" : ""}
                onClick={handleDownload}
                role="button"
                aria-label="Download resume"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDownloading ? "Downloading..." : "Download Resume"}
              </motion.a>
            </div>
            <div className="social-links">
              <motion.a
                href="https://github.com/khatri-raj"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="GitHub profile"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/rajkhatri2002/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="LinkedIn profile"
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <img
              // src="/your-photo.jpg"
              src="http://192.168.1.3:3000/your-photo.jpg"
              alt="Raj, Full Stack Developer"
              onError={(e) => (e.target.src = "https://via.placeholder.com/400?text=Profile+Image")}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;