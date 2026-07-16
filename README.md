# Nexus AI – Smart Campus Assistant

## 📖 About

Nexus AI is a full-stack web application that enhances the university experience through AI-powered assistance and centralized campus services. Instead of switching between multiple platforms, users can access study tools, campus information, announcements, faculty contacts, and peer collaboration from a single application.

The project features a modern cyberpunk-inspired interface, secure authentication, role-based access control, and seamless AI integration using Google Gemini.

---

# ✨ Features

* 🤖 AI Chat Assistant powered by Google Gemini
* 📚 AI Study Helper for summaries and study plans
* 🔐 Secure JWT Authentication
* 👥 Student, Faculty & Admin roles
* 📊 Personalized Dashboard
* 🗺 Interactive Campus Map
* 📢 Campus Announcements
* 👨‍🏫 Faculty Directory
* 🤝 Peer Connect
* 💬 Feedback System
* 📱 Fully Responsive UI
* 🌙 Glassmorphism & Animated Interface
* ⚡ MongoDB Fallback Mode

---

# 🖼 Application Screenshots

## 🏠 Landing Page

<img width="940" height="436" alt="image" src="https://github.com/user-attachments/assets/d6469854-c193-419a-ab9a-8400063c24a7" />
<img width="938" height="385" alt="image" src="https://github.com/user-attachments/assets/00923b90-ee36-4143-b739-47a2dad8bfd0" />
<img width="937" height="103" alt="image" src="https://github.com/user-attachments/assets/6437f276-fa65-4a77-83a8-582be51a2552" />


---

## 🔐 Login

![Login](screenshots/login.png)

---

## 📝 Sign Up

![Signup](screenshots/signup.png)

---

## 📊 Dashboard

![Dashboard](screenshots/dashboard.png)

---

## 🤖 AI Chat Assistant

![AI Chat](screenshots/ai-chat.png)

---

## 📚 Study Helper

![Study Helper](screenshots/study-helper.png)

---

## 🗺 Campus Map

![Campus Map](screenshots/campus-map.png)

---

## 📢 Announcements

![Announcements](screenshots/announcements.png)

---

## 👨‍🏫 Faculty Directory

![Faculty Directory](screenshots/faculty-directory.png)

---

## 🤝 Peer Connect

![Peer Connect](screenshots/peer-connect.png)

---

## 💬 Feedback

![Feedback](screenshots/feedback.png)

---

# 🏗 System Architecture

```
React + TypeScript
        │
        ▼
 React Router
        │
        ▼
 Axios REST API
        │
        ▼
Node.js + Express
        │
 ┌──────┴──────┐
 ▼             ▼
MongoDB     Google Gemini API
```

---

# 🛠 Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Framer Motion
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcryptjs

### AI

* Google Gemini API

### Development Tools

* Git
* GitHub
* npm

---

# 📂 Project Structure

```
Nexus-AI/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
├── shared/
├── screenshots/
├── .env.example
├── package.json
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nexus-ai-smart-campus-assistant.git

cd nexus-ai-smart-campus-assistant
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## 4. Start the Development Server

```bash
npm run dev
```

---

# 🔒 Authentication

* User Registration
* User Login
* JWT Token Authentication
* Password Encryption using bcrypt
* Protected Routes
* Role-Based Authorization

---

# 🤖 AI Capabilities

### AI Chat

* Campus guidance
* Academic assistance
* General questions
* Context-aware conversations

### Study Helper

* Generate study schedules
* Summarize notes
* Explain complex topics
* Learning assistance

---

# 📱 Responsive Design

Optimized for

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

# 🚀 Future Enhancements

* Google OAuth
* GitHub OAuth
* Push Notifications
* Real-time Chat
* GPA Tracker
* Admin Analytics Dashboard
* Progressive Web App (PWA)
* File Upload for AI Analysis

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
