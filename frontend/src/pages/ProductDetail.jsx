import React from 'react';

const CreateProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Yeni Ürün Oluştur</h1>
      <form>
        <div className="mb-4">
          <label className="block text-secondary">Ürün Adı</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-secondary">Açıklama</label>
          <textarea className="w-full px-4 py-2 border rounded-md"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-secondary">Fiyat</label>
          <input type="number" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
          Oluştur
        </button>
      </form>
    </div>
  );
};

// Varsayılan olarak CreateProduct bileşenini export ediyoruz
export default CreateProduct;
