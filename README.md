# Valentina Valdez — Portfolio

Built with React + Vite + Framer Motion + React Router.

## How to run

    npm install
    npm run dev

Open http://localhost:5173

## Routes

- `/` — Home (hero scroll-driven + intro + sticky cards)
- `/work/nombre-proyecto-1` — Project page (horizontal scroll)
- `/contact` — Contact page

## Architecture

```
src/
├── App.jsx
├── main.jsx
├── data/projects.js
├── components/
│   ├── RailNav.jsx
│   └── ScrollHero.jsx
├── pages/
│   ├── Home.jsx
│   ├── Project.jsx
│   └── Contact.jsx
└── styles/
    ├── index.css
    ├── home.css
    ├── project.css
    └── contact.css
```
