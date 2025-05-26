# Portfolio Website

This is a personal portfolio website built with React and framer-motion for animations. It fetches project data dynamically from a backend API and includes a fully functional contact form.

---

## Features

- **Animated Project Cards:** Uses `framer-motion` for smooth hover and load animations.
- **Dynamic Projects:** Fetches project data from a backend API (`/api/projects/`) and displays them with tech stack badges.
- **Contact Form:** Includes validation, animated inputs, and submits data to backend API (`/api/contact/`).
- **Responsive Design:** Clean, modern UI with CSS styling.
- **Component-based architecture:** Uses reusable React components like `ProjectCard`, `ContactForm`, `Navbar`, `HeroSection`, `AboutMe`, and `ExperienceSection`.

---

## Technologies Used

- React.js
- Framer Motion (Animations)
- Axios (HTTP requests)
- CSS for styling
- Backend API (assumed Django or any REST API)

---

## Project Structure

```
Portfolio/
├── backend/                 # Django backend
│   ├── manage.py
│   ├── backend/            # Django project folder
│   ├── contact/            # Django app for contact form
│   └── requirements.txt
├── frontend/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
|   |   |       \- Navbar.jsx
|   |   |       \- HeroSection.jsx
|   |   |       \- AboutMe.jsx
|   |   |       \- ExperienceSection.jsx
|   |   |       \- ProjectCard.jsx
|   |   |       \- ContactForm.jsx
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── README.md
└── .gitignore

````

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/khatri-raj/Portfolio.git
cd Portfolio
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Make sure your backend API is running on `http://localhost:8000/api/` or update the API URLs in the code accordingly.

---

## Usage

* Visit the homepage to see the animated hero section, about me, experience, and projects.
* Projects are fetched dynamically from the API.
* Use the contact form to send a message. Form validates inputs before submission.
* Project cards animate on load and on hover.

---

## Contact Form Details

* Fields: Name, Email, Subject, Message
* Validates input fields and email format.
* Shows success and error messages with smooth animations.
* Sends form data to backend via POST request to `/api/contact/`.

---

## Customization

* Replace `project.image`, `project.title`, `project.description`, and `project.tech_stack` in backend API to update projects.
* Customize styling by editing `ProjectCard.css` and inline styles in `ContactForm.jsx`.
* Add or modify components like `HeroSection`, `AboutMe`, or `ExperienceSection` as needed.

---

## Contributing

Feel free to fork the repo and submit pull requests to improve the portfolio.

---

---

## Contact

Created by Raj Khatri
[GitHub](https://github.com/khatri-raj)
Email: [rajkhatri8060@gmail.com]

