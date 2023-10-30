import asyncHandler from "express-async-handler";
import { db } from "../config/database.js";
import cloudinaryService from "../services/cloudinary.config.js";
import { ObjectId } from "mongodb";
const createDish = asyncHandler(async (req, res) => {
  const dishValue = JSON.parse(req.body.body);
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = dishValue;
  const { email } = req.user;
  const file = req.file;
  console.log("path", file);
  const exitstingDish = await db.dishes.findOne({ tenHang });

  if (exitstingDish) {
    res.status(400);
    throw new Error("Món ăn đã tồn tại");
  }
  if (file) {
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
    console.log("img", newDish);
  } else {
    const newDish = {
      // _id: id,
      email,
      maHangHoa,
      tenHang,
      nhomHang,
      loai,
      giaBan,
      giaVon,
      hinhAnh: "",
    };
    await db.dishes.insertOne(newDish);
    console.log("noimg", newDish);
  }

  res.status(200).json({
    message: "Thêm sản phẩm thành công",
  });
});

const getDish = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const getAllDish = await db.dishes.find({ email }).toArray();
  res.status(200).json(getAllDish);
});
const deleteDish = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const exitstingDish = await db.dishes.findOne({ _id: new ObjectId(id) });
  if (!exitstingDish) {
    return res.status(400).json({
      message: "Không tìm thấy món ăn",
    });
  }
  await db.dishes.deleteOne({ _id: new ObjectId(id) });
  res.status(200).json({
    message: "Xóa món ăn thành công ",
  });
});
const updateDish = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const file = req.file;
  console.log("update file", file);
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = req.body;
  const exitstingDish = await db.dishes.findOne({ _id: new ObjectId(id) });
  if (!exitstingDish) {
    res.status(400).json({
      message: "Không tìm thấy món ăn",
    });
  }
  const uploadFile = await cloudinaryService.upLoadingSingleFile(file.path);
  const hinhAnh = uploadFile.url;
  // console.log("image", image);
  const updatingDish = {
    ...(maHangHoa && { maHangHoa }),
    ...(tenHang && { tenHang }),
    ...(nhomHang && { nhomHang }),
    ...(loai && { loai }),
    ...(giaBan && { giaBan }),
    ...(giaVon && { giaVon }),
    ...(file && { hinhAnh }),
  };
  await db.dishes.updateOne({ _id: new ObjectId(id) }, { $set: updatingDish });
  const updatedDish = await db.dishes.findOne({ _id: new ObjectId(id) });
  res.status(200).json(updatedDish);
});
const menuController = {
  createDish,
  getDish,
  deleteDish,
  updateDish,
};

export default menuController;
