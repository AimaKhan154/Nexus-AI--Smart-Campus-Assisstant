//API ROUTES BANATA HAI LOGIN AND SIGNUP,PASSWORD HASHING (BYCRPT KRTA HAI),MONGODB SE CONNECT KRTA
//JWT TOKEN GENERATE KRTA ,FRONTEND SE CONNECT KRTA HAI, PORA BACKEND HANDLE KRTA HAI
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "./src/lib/mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./src/models/User";

// dotenv configuration moved to top of file
//JWT (JSON Web Token) ek secure token hota hai jo user authentication ke liye use hota hai.
//JWT (JSON Web Token) ek authentication token hai jo login ke baad user ki identity 
// verify karne ke liye use hota hai
const JWT_SECRET = process.env.JWT_SECRET || "nexus-quantum-secret-key-2024";

// Fallback In-Memory Store for demo purposes when DB is unreachable
const memoryStore = {
  users: [] as any[],
};

async function startServer() {
  const app = express();
  const BASE_PORT = Number(process.env.PORT || 3000);

  const listenWithFallback = (startingPort: number, attempts = 5) => {
    return new Promise<void>((resolve, reject) => {
      let currentPort = startingPort;
      let tries = 0;

      const startListen = () => {
        const server = app.listen(currentPort, "0.0.0.0", () => {
          console.log(`Nexus Server running on http://localhost:${currentPort}`);
          resolve();
        });

        server.on("error", (err: NodeJS.ErrnoException) => {
          if (err.code === "EADDRINUSE" && tries < attempts - 1) {
            console.warn(`Port ${currentPort} is already in use. Trying port ${currentPort + 1}...`);
            tries += 1;
            currentPort += 1;
            startListen();
          } else {
            reject(err);
          }
        });
      };

      startListen();
    });
  };

  // Initialize DB Connection
  await connectDB();

  app.use(express.json());

  // API Routes
  app.get("/api/health", async (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.json({ 
      status: "ok", 
      university: "Sir Syed University",
      dbConnected: isDbConnected,
      mode: isDbConnected ? "Production (MongoDB)" : "Demo (In-Memory Fallback)",
      uriPresent: !!process.env.MONGODB_URI
    });
  });

  // Validation helper functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
      return { valid: false, message: "Password must be at least 6 characters long" };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: "Password must contain at least one number" };
    }
    return { valid: true };
  };

  const validateName = (name: string): { valid: boolean; message?: string } => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      return { valid: false, message: "Name must be at least 2 characters long" };
    }
    if (trimmed.length > 100) {
      return { valid: false, message: "Name cannot exceed 100 characters" };
    }
    return { valid: true };
  };

  // Auth Routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password, major = "Undecided", role = "Student" } = req.body;
      const dbReady = mongoose.connection.readyState === 1;

      // Input validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields (name, email, password) are required" });
      }

      // Validate name
      const nameValidation = validateName(name);
      if (!nameValidation.valid) {
        return res.status(400).json({ error: nameValidation.message });
      }

      // Validate email format
      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format. Please use a valid email address" });
      }

      // Validate password strength
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ error: passwordValidation.message });
      }

      // Check if user already exists
      let existingUser;
      if (dbReady) {
        existingUser = await User.findOne({ email: email.trim().toLowerCase() });
      } else {
        existingUser = memoryStore.users.find(u => u.email === email.trim().toLowerCase());
      }

      if (existingUser) {
        return res.status(400).json({ error: "This email is already registered in Nexus. Please login or use a different email" });
      }

      // Validate role
      const validRoles = ["student", "faculty", "admin"];
      const normalizedRole = role.toLowerCase();
      if (!validRoles.includes(normalizedRole)) {
        return res.status(400).json({ error: "Invalid role specified" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        major: major || "Undecided",
        role: normalizedRole,
        year: "1st",
        interests: [],
        createdAt: new Date(),
        _id: dbReady ? undefined : Math.random().toString(36).substring(7)
      };

      let savedUser;
      if (dbReady) {
        const user = new User(userData);
        await user.save();
        savedUser = user.toObject();
      } else {
        memoryStore.users.push(userData);
        savedUser = { ...userData };
      }

      // Generate JWT token
      const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });
      
      // Remove password from response
      delete savedUser.password;

      res.status(201).json({ 
        user: savedUser, 
        token,
        message: "Neural profile successfully integrated into Nexus"
      });
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "Failed to integrate neural profile. Please try again later" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const dbReady = mongoose.connection.readyState === 1;

      // Input validation
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Find user by email (case-insensitive)
      let user;
      if (dbReady) {
        user = await User.findOne({ email: email.trim().toLowerCase() });
      } else {
        user = memoryStore.users.find(u => u.email === email.trim().toLowerCase());
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password. Please check your credentials and try again" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password. Please check your credentials and try again" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
      
      // Prepare user response
      const userResponse = dbReady ? user.toObject() : { ...user };
      delete userResponse.password;

      res.json({ 
        user: userResponse, 
        token,
        message: "Successfully connected to Nexus Core"
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Connection to Nexus failed. Please try again later" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  await listenWithFallback(BASE_PORT);
}

startServer().catch((err) => {
  console.error("Failed to start Nexus Server:", err);
  process.exit(1);
});
