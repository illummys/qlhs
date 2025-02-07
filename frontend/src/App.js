import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/profiles"

function App() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    axios.get("http://localhost:5000/profiles")
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await axios.post(API_URL, { name, email });
      alert("Lưu thành công!");
      setName("");
      setEmail("");
      setError("");
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
    }
  }

  return (
    <div>
      <h2>Quản lý Hồ sơ</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Lưu</button>
      </form>

      <h3>Danh sách hồ sơ</h3>
      <ul>
        {profiles.map((p) => (
          <li key={p._id}>{p.name} - {p.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
