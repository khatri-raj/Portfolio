import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <style>
        {`
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px;
            background-color: ${theme === "light" ? "#ffffff" : "#1f2937"};
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .logo {
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
          }

          .logo:hover {
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .nav-links {
            display: flex;
            gap: 20px;
          }

          .nav-links a {
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            text-decoration: none;
            font-weight: 500;
            position: relative;
            padding-bottom: 5px;
            transition: color 0.3s;
          }

          .nav-links a:hover,
          .nav-links a.active {
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .nav-links a.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .theme-toggle {
            background: none;
            border: none;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px 10px;
            transition: color 0.3s;
          }

          .theme-toggle:hover {
            color: ${theme === "light" ? "#007bff" : "#21a1f1"};
          }

          .hamburger {
            display: none;
            cursor: pointer;
            flex-direction: column;
            gap: 5px;
          }

          .hamburger div {
            width: 25px;
            height: 3px;
            background-color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }

          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }

            .mobile-menu {
              position: fixed;
              top: 60px;
              right: 0;
              height: calc(100vh - 60px);
              background-color: ${theme === "light" ? "#ffffff" : "#1f2937"};
              flex-direction: column;
              width: 200px;
              padding-top: 40px;
              display: flex;
              gap: 20px;
              z-index: 101;
            }

            .hamburger {
              display: flex;
            }
          }
        `}
      </style>
      <nav role="navigation" aria-label="Main navigation">
        <Link to="/" className="logo" aria-label="Go to home">
          MyPortfolio
        </Link>

        <div className="nav-links">
          {navLinks.map(({ path, label }) => (
            <motion.div
              key={path}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to={path}
                className={location.pathname === path ? "active" : ""}
                aria-current={location.pathname === path ? "page" : undefined}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div
          className="hamburger"
          onClick={toggleMenu}
          role="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={isOpen ? { rotate: -45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            animate={isOpen ? { rotate: 45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {navLinks.map(({ path, label }) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    to={path}
                    className={location.pathname === path ? "active" : ""}
                    onClick={() => setIsOpen(false)}
                    aria-current={location.pathname === path ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;