const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let profiles = [];

app.get("/profiles", (req, res) => {
  res.json(profiles);
});

app.post("/profiles", (req, res) => {
  const newProfile = req.body;
  profiles.push(newProfile);
  res.json({ message: "Hồ sơ đã được thêm!", profile: newProfile });
});

app.listen(5000, () => console.log("Backend chạy trên cổng 5000"));
