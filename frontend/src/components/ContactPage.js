import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = ({ theme }) => {
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        // replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData); // map backend errors properly if needed
        setSubmitSuccess(false);
      } else {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitSuccess(false);
      setErrors({ general: "Failed to send message. Please try again later." });
    }
  };

  const styles = {
    form: {
      maxWidth: "750px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      padding: "20px",
      backgroundColor: isDark ? "#2d3748" : "#ffffff",
      borderRadius: "10px",
      boxShadow: isDark
        ? "0 4px 12px rgba(255, 255, 255, 0.1)"
        : "0 4px 12px rgba(0, 0, 0, 0.1)",
      color: isDark ? "#e2e8f0" : "#111827",
    },
    label: {
      fontWeight: "600",
      fontSize: "1rem",
      marginBottom: "6px",
      color: isDark ? "#e2e8f0" : "#111827",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: `1px solid ${isDark ? "#4a5568" : "#ccc"}`,
      backgroundColor: isDark ? "#4a5568" : "#fff",
      color: isDark ? "#e2e8f0" : "#111827",
      outline: "none",
      fontSize: "1rem",
      width: "100%",
      boxSizing: "border-box",
      transition: "border-color 0.3s ease",
    },
    textarea: {
      padding: "10px",
      borderRadius: "6px",
      border: `1px solid ${isDark ? "#4a5568" : "#ccc"}`,
      backgroundColor: isDark ? "#4a5568" : "#fff",
      resize: "vertical",
      outline: "none",
      fontSize: "1rem",
      width: "100%",
      boxSizing: "border-box",
      transition: "border-color 0.3s ease",
      color: isDark ? "#e2e8f0" : "#111827",
    },
    button: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: isDark ? "#3182ce" : "#61dafb",
      color: isDark ? "#e2e8f0" : "#282c34",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1.1rem",
      width: "100%",
      boxSizing: "border-box",
      transition: "background-color 0.3s ease",
    },
    error: {
      color: "#f56565",
      fontSize: "0.9rem",
      marginTop: "-6px",
      marginBottom: "6px",
    },
    success: {
      color: "#48bb78",
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <>
      <style>
        {`
          .contact-page {
            padding: 60px 20px;
            max-width: 1200px;
            margin: 0 auto;
            background-color: ${
              theme === "light" ? "#ffffff" : "#2d3748"
            };
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            min-height: calc(100vh - 60px);
          }

          .contact-page h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-align: center;
            color: ${theme === "light" ? "#111827" : "#f9fafb"};
          }
        `}
      </style>
      <section className="contact-page" aria-label="Contact section">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          {submitSuccess && (
            <div style={styles.success}>
              Your message has been sent successfully!
            </div>
          )}
          {errors.general && (
            <div style={styles.error} role="alert">
              {errors.general}
            </div>
          )}

          <label style={styles.label} htmlFor="name">
            Name
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby="name-error"
          />
          {errors.name && (
            <span style={styles.error} id="name-error">
              {errors.name}
            </span>
          )}

          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span style={styles.error} id="email-error">
              {errors.email}
            </span>
          )}

          <label style={styles.label} htmlFor="subject">
            Subject
          </label>
          <input
            style={styles.input}
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby="subject-error"
          />
          {errors.subject && (
            <span style={styles.error} id="subject-error">
              {errors.subject}
            </span>
          )}

          <label style={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            style={styles.textarea}
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="message-error"
          />
          {errors.message && (
            <span style={styles.error} id="message-error">
              {errors.message}
            </span>
          )}

          <button style={styles.button} type="submit">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
};

export default ContactPage;
