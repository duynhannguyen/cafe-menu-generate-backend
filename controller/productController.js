import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
const createDish = asyncHandler(async (req, res) => {
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = req.body;
  const { email } = req.user;
  const file = req.file;
  console.log("file", file);
  const exitstingDish = await db.dishes.findOne({ tenHang });

  // if (exitstingDish) {
  //   res.status(400);
  //   throw new Error("Món ăn đã tồn tại");
  // }

  const newDish = {
    // _id: id,
    email,
    maHangHoa,
    tenHang,
    nhomHang,
    loai,
    giaBan,
    giaVon,
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
