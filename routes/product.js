import  express from "express";
import * as  productController from "../controllers/product.js";
import { authAdmin,auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/",productController.getAllProducts);

router.get("/:id",productController.getProductById);

router.post("/",authAdmin,productController.addProduct);

router.delete("/:id",authAdmin,productController.deleteProductById);

router.put("/:id",productController.updateProductById);

router.get("/num/pages", productController.getNumOfPages);

export default router;