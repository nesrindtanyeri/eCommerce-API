import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/products', form);
      console.log('Yeni Ürün Oluşturuldu:', response.data);
      // Başarılı bir şekilde ürün oluşturulduktan sonra formu temizle
      setForm({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Ürün oluşturulurken hata oluştu:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Yeni Ürün Oluştur</h1>
      <form onSubmit={handleSubmit} className="bg-neutral p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-secondary font-semibold mb-2">Ürün Adı</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-secondary font-semibold mb-2">Açıklama</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring focus:ring-primary"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-secondary font-semibold mb-2">Fiyat</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring focus:ring-accent"
        >
          Oluştur
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
