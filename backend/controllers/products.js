// controllers/products.js
import Product from '../models/Product.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const newProduct = await Product.create({ name, description, price, categoryId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the product.', error });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    const { name, description, price, categoryId } = req.body;
    await product.update({ name, description, price, categoryId });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the product.', error });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Product successfully deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the product.', error });
  }
};
