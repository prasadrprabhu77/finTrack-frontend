# 📱 FinTrack Frontend

Frontend for the FinTrack personal finance manager application.  
Built with **React** and **Vite**, this application provides a user interface to log in, view transactions, add expenses/income, and interact with the FinTrack backend. :contentReference[oaicite:1]{index=1}

---

## 🚀 Overview

FinTrack Frontend is a responsive and performant web application that allows users to:

- 🔑 Register and log in securely
- 📊 View dashboard with financial summary
- ➕ Add new transactions (income & expense)
- 🗂️ Filter & categorize expenses
- 📈 Track overall balance and trends
- 🔗 Integrate seamlessly with the FinTrack backend API

This project works together with the FinTrack Backend API to provide a full-stack financial tracking solution.

---

## 🛠 Tech Stack

- **React** — UI library  
- **Vite** — Development & build tool  
- **Tailwind CSS** — Utility-first CSS framework  
- **Axios** — HTTP client for API calls  
- **React Router DOM** — Routing & navigation  
- **ESLint** — Code quality & formatting  
- **JavaScript (ES6+)** — Modern JS syntax 

---

## 📁 Project Structure

finTrack-frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── services/ # API service functions
│ ├── styles/ # CSS/Tailwind custom styles
│ └── App.jsx # Main App component
├── public/ # Static assets
├── .env # Environment variables
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/prasadrprabhu77/finTrack-frontend.git
cd finTrack-frontend
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the project root:

VITE_API_BASE_URL=<your_backend_api_url>
Example:

VITE_API_BASE_URL=https://fintrack-backend.example.com
▶️ Running the App
Start the development server:

npm run dev
Open your browser and go to:

http://localhost:5173
Production build:

npm run build
Preview the production build:

npm run preview
🧠 Features
🧾 User Authentication — Login & signup flows

📊 Dashboard — Overview of total balance, income, expenses

➕ Add Transactions — Create income & expense entries

🔍 Filter & Sort — View records by date or category

🧠 Responsive Design — Works on mobile and desktop

🔌 API Integration
The frontend uses Axios to make HTTP requests to the backend API.
Ensure your backend is running and reachable at the URL defined in your .env file.

Example setup in .env:

VITE_API_BASE_URL=https://your-fintrack-backend.vercel.app
Requests will look like:

GET  ${VITE_API_BASE_URL}/api/transactions
POST ${VITE_API_BASE_URL}/api/auth/login
📄 Screenshots / Demo


(Replace filenames with actual screenshots if available.)

Live Demo link: fin-track-frontend-pi.vercel.app

📦 Deployment
You can deploy this frontend with hosts like:
Vercel (recommended)
Netlify
GitHub Pages
Cloudflare Pages

Make sure to configure environment variables on your deployment platform.

Example for Vercel:

VITE_API_BASE_URL=https://fin-track-backend-mu.vercel.app
🧩 Contributing
Contributions are welcome! To contribute:

Fork the repo

Create a feature branch

Commit changes

Open a pull request

👨‍💻 Author
Prasad Prabhu
GitHub: https://github.com/prasadrprabhu77

