import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import uploadImageRouter from "./routes/uploadImage";
import cors from "cors";

// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

//router
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", authRouter);
// app.use("/api", uploadImageRouter);

// connect to db
mongoose.connect("mongodb://127.0.0.1:27017/we17309");

export const viteNodeApp = app;
