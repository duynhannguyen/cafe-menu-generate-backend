import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
import { v2 as cloudinary } from "cloudinary";
import cloudinaryService from "../services/cloudinary.config.js";
const createDish = asyncHandler(async (req, res) => {
  const dishValue = JSON.parse(req.body.body);
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = dishValue;
  console.log("api", dishValue);
  const { email } = req.user;
  const file = req.file;
  const exitstingDish = await db.dishes.findOne({ tenHang });

  if (exitstingDish) {
    res.status(400);
    throw new Error("Món ăn đã tồn tại");
  }
  const uploadFile = await cloudinaryService.upLoadingSingleFile(file.path);
  const newDish = {
    // _id: id,
    email,
    maHangHoa,
    tenHang,
    nhomHang,
    loai,
    giaBan,
    giaVon,
    hinhAnh: uploadFile.url,
  };

  await db.dishes.insertOne(newDish);
  res.status(200).json({
    message: "Thêm sản phẩm thành công",
  });
});

const menuController = {
  createDish,
};

export default menuController;
