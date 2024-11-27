import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
        // Show success notification
        toast.success('Products fetched successfully!');
      } catch (error) {
        console.error('An error occurred while fetching products:', error);
        // Show error notification
        toast.error('An error occurred while fetching products.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-4 text-primary">Home Page</h1>
      <p className="mb-6">
        Here you can see the existing products. To add a new product, use the "Create Product" link in the top menu.
      </p>
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
        <p>
          No products found yet. Please use the "Create Product" page above to add a new product.
        </p>
      )}
    </div>
  );
};

export default Home;
