import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import "./HomeStyles.css"


const API_URL = "http://localhost:5000/profiles"
function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState("");
  
  useEffect(() => {
    fetch("http://localhost:5000/profiles")
            .then((res) => res.json())
            .then((data) => setProfiles(data))
            .catch((err) => console.error("Lỗi:", err));
    }, []);
  
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await axios.post(API_URL, { name, email, id });
      alert("Lưu thành công!");
      setName("");
      setEmail("");
      setError("");
      setId("");
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    }
}
    return (
        <div className="grid-container">
            <div className="header">
                <h1>Quản lý Hồ sơ</h1>
                {error && <p style={{color: "red"}}>{error}</p>}
            </div>
        <div className="grid-item">
            <form className="form-group" onSubmit={handleSubmit}>
                <label for="name">Họ và tên : </label>
                <input
                    type="text"
                    placeholder="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label for="email">Email : </label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label for="id">MSSV: </label>
                <input
                    type="number"
                    placeholder='Mã số sinh viên'
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="container" type="submit">Lưu</button>
            </form>
        </div>

      <h3>Danh sách hồ sơ</h3>
      <ul>
        {profiles.map((p) => (
          <li key={p._id}>{p.name} - {p.email} - {p.id}</li>
        ))}
      </ul>
    </div>
    );
};

export default HomePage;