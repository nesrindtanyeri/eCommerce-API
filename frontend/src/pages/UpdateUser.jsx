import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Kullanıcı bilgilerini çekmek için
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Kullanıcı alınırken hata oluştu:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Boş alanları kontrol et
    if (!user.name || !user.email || !user.password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    try {
        // Sadece gerekli alanları alarak yeni bir nesne oluşturun
        const updatedUserData = {
          name: user.name,
          email: user.email,
          password: user.password,
        };
    
        const response = await axios.put(`http://localhost:3000/users/${id}`, updatedUserData);
        console.log('Kullanıcı başarıyla güncellendi:', response.data);
      } catch (error) {
        console.error('Kullanıcı güncellenirken hata oluştu:', error);
      }
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Kullanıcıyı Güncelle</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-secondary">Ad</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-secondary">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-secondary">Şifre</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
