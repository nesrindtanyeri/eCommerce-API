import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import validate from '../middleware/validate.js';
import { productSchema } from '../schemas/productSchemas.js';

const router = express.Router();

// Ürün listesi
router.get('/', getProducts);

// ID'ye göre ürün getirme
router.get('/:id', getProductById);

// Yeni ürün oluşturma (validation middleware kullanılarak)
router.post('/', validate(productSchema), createProduct);

// Mevcut ürünü güncelleme (validation middleware kullanılarak)
router.put('/:id', validate(productSchema), updateProduct);

// Ürünü silme
router.delete('/:id', deleteProduct);

export default router;

