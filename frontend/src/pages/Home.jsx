import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Ürünler alınırken hata oluştu:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">Ana Sayfa</h1>
      <p className="mb-6">Bu sayfada mevcut ürünleri görüntüleyebilirsiniz. Yeni ürün eklemek için üst menüdeki "Create Product" bağlantısını kullanabilirsiniz.</p>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-secondary">{product.name}</h2>
                <p>{product.description}</p>
                <p className="text-lg font-semibold text-accent">{product.price} TL</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz ürün bulunamadı. Yeni bir ürün eklemek için yukarıdaki "Create Product" sayfasını kullanabilirsiniz.</p>
      )}
    </div>
  );
};

export default Home;
