import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Kullanıcılar alınırken hata oluştu:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      alert("Kullanıcı başarıyla silindi.");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Kullanıcı silinirken hata oluştu:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    // Sadece güncellenmesi gereken alanları seçin
    const updatedData = {
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    };
  
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${editingUser.id}`,
        updatedData
      );
      alert("Kullanıcı başarıyla güncellendi.");
      setUsers(
        users.map((user) => (user.id === editingUser.id ? response.data : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">Kullanıcı Listesi</h1>
      {editingUser ? (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Kullanıcıyı Güncelle</h2>
          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div>
              <label className="block mb-1 text-secondary">Ad</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-secondary">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 text-secondary">Şifre</label>
              <input
                type="password"
                name="password"
                value={updatedUser.password}
                onChange={handleInputChange}
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Güncelle
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-4"
            >
              İptal
            </button>
          </form>
        </div>
      ) : (
        <>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <div key={user.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-accent">{user.name}</h2>
                    <p className="text-neutral">Email: {user.email}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Sil
                      </button>
                      <button
                        className="btn btn-accent ml-2"
                        onClick={() => handleEditUser(user)}
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral">Kullanıcı bulunamadı.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
