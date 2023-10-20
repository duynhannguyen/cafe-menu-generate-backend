import express from "express";

const router = express.Router();

router.post('/add-product', (req, res) => {
  const { maHangHoa, tenHang, nhomHang, loai, giaBan, giaVon } = req.body;

  res.json({ message: 'Thêm sản phẩm thành công' });
});

export default router;