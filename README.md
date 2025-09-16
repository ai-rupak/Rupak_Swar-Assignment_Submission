


# 💳 Smart Vendor Payment Automation Simulator

A full-stack MERN application that simulates **automated vendor payment workflows** with features like invoice processing, duplicate detection, early-payment savings insights, and analytics dashboards.

---

## 🚀 Features

- 🔐 **Authentication System** (Register/Login with JWT)
- 📤 **Invoice Upload** (CSV/Excel file support with parsing)
- 📊 **Analytics Dashboard**
  - Invoice status distribution
  - Top vendors by total amount
  - Duplicate invoice detection
  - Savings estimation (early payment discounts)
  - Average invoice amount per vendor
- 📈 **Charts & Visualizations** (Recharts)
- 🖥️ **Responsive UI** built with React + Tailwind CSS

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Recharts

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- Multer (file upload handling)
- JWT Authentication
- CORS enabled

### **Deployment**
- Frontend: Vercel  
- Backend: Vercel Serverless Functions

---

## 📂 Project Structure

```

ai-rupak-rupak\_swar-assignment\_submission/
├── invoices.csv                 # Sample invoice data
├── backend/                     # Backend (Node.js + Express)
│   ├── api/                     # Vercel serverless entry
│   │   └── index.js
│   ├── config/                  # DB connection
│   ├── controllers/             # Business logic
│   ├── middlewares/             # Auth & file upload
│   ├── models/                  # Mongoose models
│   ├── routes/                  # API routes
│   ├── server.js                # Express app
│   └── vercel.json              # Vercel config
└── frontend/                    # Frontend (React + Vite)
├── src/
│   ├── components/          # UI Components
│   ├── pages/               # App Pages
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js

````

---

## ⚡ Getting Started (Run Locally)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-vendor-payment-simulator.git
cd smart-vendor-payment-simulator
````

### 2. Setup Backend

```bash
cd backend
npm install
```

* Create a `.env` file inside `backend/` with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

* Start backend locally:

```bash
npm run dev
```

(Default: runs on `http://localhost:5000`)

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

(Default: runs on `http://localhost:5173`)

---

## 📊 Sample Data

A sample `invoices.csv` is included in the project root. You can upload it from the dashboard to test features like:

* Duplicate detection
* Vendor stats
* Savings insights

---

## 🔮 Future Improvements

* Role-based access (Admin/Finance Manager/Vendor)
* Automated payment scheduling
* AI-based anomaly detection in invoices
* Integration with payment gateways

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR.

---

## 📜 License

This project is licensed under the **MIT License**.

```

---

Would you like me to also **add screenshots placeholders** (like `![Dashboard Screenshot](docs/dashboard.png)`) so your README looks more visual on GitHub?
```
