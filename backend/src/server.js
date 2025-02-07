const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let profiles = [];  // Dữ liệu tạm thời

// Lấy danh sách hồ sơ
app.get("/profiles", (req, res) => {
  res.json(profiles);
});

// Thêm hồ sơ mới
app.post("/profiles", (req, res) => {
  const newProfile = req.body;
  profiles.push(newProfile);
  res.json({ message: "Hồ sơ đã được thêm!", profile: newProfile });
});

// Chạy server
app.listen(5000, () => console.log("Backend chạy trên cổng 5000"));
