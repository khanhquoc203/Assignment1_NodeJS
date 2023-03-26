
import express from "express";
import { getAll, get, create, update, remove } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission"

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", checkPermission, create)
router.patch("/products/:id", checkPermission, update)
router.delete("/products/:id", checkPermission, remove)


export default router


