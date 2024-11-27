import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Navigate programmatically
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setErrorMessage('Error occurred while fetching product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      alert('Product deleted successfully.');
      navigate('/'); // Navigate back to the home page after deleting
    } catch (error) {
      setErrorMessage('Error occurred while deleting the product.');
    }
  };

  if (errorMessage) {
    return <div className="text-error">{errorMessage}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">{product.name}</h1>
      <div className="bg-neutral p-6 rounded-md shadow-md mb-6">
        <p className="text-lg text-secondary font-semibold mb-2">Description:</p>
        <p>{product.description}</p>
        <p className="text-lg text-secondary font-semibold mt-4">Price: <span className="text-accent">{product.price} USD</span></p>
      </div>
      <button
        onClick={() => navigate(`/update-product/${id}`)}
        className="btn btn-secondary text-white px-4 py-2 rounded-md mr-4"
      >
        Edit Product
      </button>
      <button
        onClick={handleDelete}
        className="btn btn-error text-white px-4 py-2 rounded-md"
      >
        Delete Product
      </button>
    </div>
  );
};

export default ProductDetail;
