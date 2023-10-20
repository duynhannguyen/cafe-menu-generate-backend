import express from "express";
import menuController from "../controller/productController.js";

const router = express.Router();

router.post(
  "/menu",menuController.createDish
);



export default router;


 