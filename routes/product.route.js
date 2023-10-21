import express from "express";
import menuController from "../controller/productController.js";
import authMdw from "../middlewares/auth.mdw.js";
import uploadMdw from "../middlewares/upload.mdw.js";

const router = express.Router();

router.post(
  "/menu",
  authMdw,
  uploadMdw.single("image"),
  menuController.createDish
);

export default router;
