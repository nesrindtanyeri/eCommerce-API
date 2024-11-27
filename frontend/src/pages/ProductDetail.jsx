import React from 'react';

const CreateProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Create New Product</h1>
      <form>
        <div className="mb-4">
          <label className="block text-secondary">Product Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-secondary">Description</label>
          <textarea className="w-full px-4 py-2 border rounded-md"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-secondary">Price</label>
          <input type="number" className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
          Create
        </button>
      </form>
    </div>
  );
};

// Export CreateProduct component as default
export default CreateProduct;
