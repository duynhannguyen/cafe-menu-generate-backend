import express from "express";
import authRoute from "./auth.route.js";
import typeMenuRoute from "./typeMenu.route.js";
// import addProductRouter from "./ProductRoute/addProductRouter.js"
// import productsRouter from "./ProductRoute/productsRouter.js"
import productRouter from "./product.route.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mainpage", productRouter);
router.use("/mainpage", typeMenuRoute);
export default router;
