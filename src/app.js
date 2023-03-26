import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";

// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());

//router
app.use("/api", productRouter);
app.use("/api", authRouter);

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/we17309");

export const viteNodeApp = app;
