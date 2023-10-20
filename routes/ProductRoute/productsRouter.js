import express from "express";

const router = express.Router();


const products = [
    {
        "maHangHoa": "QQQ",
        "tenHang": "Sản phẩm 1",
        "nhomHang": "Nhóm hàng 1",
        "loai": "Đồ ăn",
        "giaBan": "10",
        "giaVon": "20"
      },
      {
        "maHangHoa": "WWW",
        "tenHang": "Sản phẩm 2",
        "nhomHang": "Nhóm hàng 1",
        "loai": "Đồ ăn",
        "giaBan": "20",
        "giaVon": "30"
      },
      {
        "maHangHoa": "EEE",
        "tenHang": "Sản phẩm 3",
        "nhomHang": "Nhóm hàng 2",
        "loai": "Thức uống",
        "giaBan": "30",
        "giaVon": "40"
      }
];

router.get('/products', (req, res) => {
  res.json(products);
});

export default router;