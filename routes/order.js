import express from "express";
import * as  orderController from "../controllers/order.js";
import { authAdmin, auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/",authAdmin, orderController.getAllorders);

router.post("/", auth, orderController.addorder);

router.delete("/:id", auth, orderController.deleteorderById);

router.get("/:id", auth, orderController.getAllOrderByUserId);

router.put("/:id", authAdmin, orderController.updateorderSetOff);

export default router;