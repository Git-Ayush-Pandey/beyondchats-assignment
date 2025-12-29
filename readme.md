# BeyondChats – Full Stack Assignment

This repository contains my complete submission for the **BeyondChats Full Stack Web Developer Intern Assignment**. The project demonstrates backend scraping, API development, AI-assisted content processing, and a React-based frontend.

---

## 📌 Project Overview

The assignment is implemented in **three phases**:

### Phase 1 – Scraping & APIs
- Scraped the **oldest blog articles** from the BeyondChats website.
- Stored articles in **MongoDB**.
- Built **CRUD APIs** using Node.js and Express.

### Phase 2 – AI-assisted Article Update
- Fetched original articles from the database.
- Searched article titles on Google to find top-ranking blogs.
- Scraped external article content.
- Used an LLM-based pipeline (with fallback handling for rate limits) to generate updated articles.
- Stored updated articles along with **reference links**.

### Phase 3 – Frontend UI
- Built a **React (Vite) frontend**.
- Displays original and updated articles.
- Clearly marks updated articles.
- Allows users to open and read full article content.

---

## 🧠 Architecture Diagram

![Architecture Diagram](./diagrams/architecture.png)

---

## 🔄 Data Flow Diagram

![Data Flow Diagram](./diagrams/data-flow.png)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Axios
- Cheerio

### Frontend
- React (Vite)
- React Router
- Axios
- Bootstrap

---

## 📂 Project Structure

```
beyondchats-assignment/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── scripts/
│       └── services/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── diagrams/
│   ├── architecture.png
│   └── data-flow.png
│
├── README.md
└── .gitignore
```

---

## ⚙️ Local Setup Instructions

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key (optional)
SERP_API_KEY=your_serpapi_key (optional)
```

Run backend server:

```bash
node src/server.js
```

---

### Run Scraping (Phase 1)

```bash
node src/scripts/seedBeyondChats.js
```

---

### Run Article Update (Phase 2)

```bash
node src/scripts/updateArticles.js
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🖥 Frontend Features

- Article list view
- Updated articles marked clearly
- Article detail page
- Loading and error states
- Responsive UI

---

## 🌐 Live Demo

Frontend Live Link: *(to be added if deployed)*

---

## 👤 Author

**Ayush Pandey**  
B.Tech CSE, IIT Jammu  
GitHub: https://github.com/Git-Ayush-Pandey

---

## 📜 Notes

- This project was built specifically for the BeyondChats internship assignment.
- Code is original and intended only for evaluation purposes.

