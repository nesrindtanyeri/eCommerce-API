import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

// Product list
router.get('/', getProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

// Update an existing product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router;
