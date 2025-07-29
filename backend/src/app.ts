import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import authRoutes from "./routes/authRoutes";

import connectDB from "./config/db";
import "./config/passport";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
// app.use("/api/notes", noteRoutes);

export default app;
