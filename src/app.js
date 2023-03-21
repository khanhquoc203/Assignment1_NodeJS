import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from "./routes/product";

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api', router)

mongoose.connect("mongodb://127.0.0.1:27017/Example")



export const viteNodeApp = app;