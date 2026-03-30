# 🎓 Student Management System

A comprehensive, full-stack web application designed to streamline student record management and academic performance tracking. Built with **Node.js**, **Express**, and **MongoDB**, this system provides a secure and professional interface for educational administrators.

---

## 🚀 Features

### 🔐 Secure Authentication
- **User Registration**: Create an account with a name, email, password, and profile picture (Base64).
- **Secure Login**: JWT-based authentication for persistent sessions.
- **Protected Profile**: Individual user profiles with dynamic avatars.

### 📚 Student Records (CRUD)
- **Comprehensive Profiles**: Store student names, emails, and unique roll numbers.
- **Academic Tracking**: Manage marks for core subjects (Mathematics, Physics, Chemistry).
- **Interactive Dashboard**: Modern, responsive table for viewing and managing records.
- **Real-time Updates**: Edit or delete student records on the fly.

### 🍱 Professional UI/UX
- **Elegant Themes**: Sophisticated gradients and glassmorphism-inspired design.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices.
- **Micro-animations**: Smooth transitions and loading states for a premium feel.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3, JavaScript (ESM), FontAwesome |
| **Backend** | Node.js, Express.js (v5+) |
| **Database** | MongoDB, Mongoose |
| **Auth** | JSON Web Tokens (JWT), BcryptJS |


---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Project uses ESM)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lakshmisanthosh87/express__student.git
   cd express__student
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/studentDB
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:4000`

---

