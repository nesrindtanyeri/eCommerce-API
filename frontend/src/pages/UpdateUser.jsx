import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Fetch user information
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!user.name || !user.email || !user.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Create a new object with only the required fields
      const updatedUserData = {
        name: user.name,
        email: user.email,
        password: user.password,
      };

      const response = await axios.put(`http://localhost:3000/users/${id}`, updatedUserData);
      console.log("User successfully updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Update User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-secondary">Name</label>
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
          <label className="block mb-1 text-secondary">Password</label>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
