import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-xl cursor-pointer"
            onClick={() => openModal(product)}
          >
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-semibold text-accent">{product.price} USD</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
{selectedProduct && (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    ariaHideApp={false}
    className="fixed inset-0 flex items-center justify-center z-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
      <p className="mb-4">{selectedProduct.description}</p>
      <p className="text-lg font-semibold text-accent mb-6">{selectedProduct.price} USD</p>
      <div className="flex justify-end space-x-4">
        <button className="btn btn-primary">Add to Cart</button>
        <button
          onClick={() => window.location.href = `/update-product/${selectedProduct.id}`}
          className="btn btn-secondary"
        >
          Edit Product
        </button>
        <button
          className="btn btn-error"
          onClick={() => { /* handle delete logic */ }}
        >
          Delete Product
        </button>
      </div>
      <button className="btn btn-neutral mt-4" onClick={closeModal}>
        Close
      </button>
    </div>
  </Modal>
)}

    </div>
  );
};

export default Home;
