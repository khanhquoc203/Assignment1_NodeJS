
import express from "express";
import { getAll, get, create, update, remove } from "../controllers/product";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", create)
router.patch("/products/:id", update)
router.delete("/products/:id", remove)


export default router


