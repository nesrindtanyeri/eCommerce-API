import Cart from '../models/Cart.js';
import CartProduct from '../models/CartProduct.js';
import Product from '../models/Product.js';

// Sepeti oluşturma (Kullanıcı için sepet var mı kontrol et, yoksa oluştur)
export const getOrCreateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ where: { userId } });
    
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Sepet oluşturulurken bir hata oluştu.', error });
  }
};

// Sepete ürün ekleme
export const addToCart = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    let cartProduct = await CartProduct.findOne({ where: { cartId, productId } });

    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      cartProduct = await CartProduct.create({ cartId, productId, quantity });
    }

    res.status(200).json(cartProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ürün sepete eklenirken bir hata oluştu.', error });
  }
};

// Sepetteki ürünleri listeleme
export const getCartProducts = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartProducts = await CartProduct.findAll({
      where: { cartId },
      include: Product
    });

    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(500).json({ message: 'Sepetteki ürünler alınırken bir hata oluştu.', error });
  }
};

// Sepetten ürün kaldırma
export const removeFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const cartProduct = await CartProduct.findOne({ where: { cartId, productId } });

    if (cartProduct) {
      await cartProduct.destroy();
      res.status(200).json({ message: 'Ürün sepetten kaldırıldı.' });
    } else {
      res.status(404).json({ message: 'Ürün sepette bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ürün sepetten kaldırılırken bir hata oluştu.', error });
  }
};
