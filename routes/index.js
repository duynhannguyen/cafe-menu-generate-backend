import express from "express";
import authRoute from "./auth.route.js";
// import addProductRouter from "./ProductRoute/addProductRouter.js"
// import productsRouter from "./ProductRoute/productsRouter.js"
import productRouter from "./product.route.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mainpage", productRouter);
export default router;
