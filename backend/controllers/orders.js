// controllers/orders.js
import Order from '../models/Order.js';
import OrderProduct from '../models/OrderProduct.js';
import Product from '../models/Product.js';

// Tüm siparişleri getir
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Belirli bir siparişi ID ile getir
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: Product });
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Bir hata oluştu.', error });
  }
};

// Yeni sipariş oluştur
export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    let total = 0;
    for (const product of products) {
      const productData = await Product.findByPk(product.productId);
      if (!productData) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${product.productId}` });
      }
      total += productData.price * product.quantity;
    }

    const newOrder = await Order.create({ userId, total });

    for (const product of products) {
      await OrderProduct.create({
        orderId: newOrder.id,
        productId: product.productId,
        quantity: product.quantity,
      });
    }

    const createdOrder = await Order.findByPk(newOrder.id, { include: Product });
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Sipariş oluşturulurken hata oluştu.', error });
  }
};

// Siparişi güncelle
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı.' });
    }

    const { products } = req.body;

    let total = 0;
    await OrderProduct.destroy({ where: { orderId: order.id } });

    for (const product of products) {
      const productData = await Product.findByPk(product.productId);
      if (!productData) {
        return res.status(404).json({ message: `Ürün bulunamadı: ${product.productId}` });
      }
      total += productData.price * product.quantity;

      await OrderProduct.create({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
      });
    }

    await order.update({ total });
    const updatedOrder = await Order.findByPk(order.id, { include: Product });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Sipariş güncellenirken hata oluştu.', error });
  }
};

// Siparişi sil
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı.' });
    }

    await OrderProduct.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.status(200).json({ message: 'Sipariş başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Sipariş silinirken hata oluştu.', error });
  }
};
