import express from 'express';
import { getOrCreateCart, addToCart, getCartProducts, removeFromCart } from '../controllers/cart.js';

const router = express.Router();

router.get('/:userId', getOrCreateCart);
router.post('/add', addToCart);
router.get('/products/:cartId', getCartProducts);
router.delete('/:cartId/:productId', removeFromCart);

export default router;
