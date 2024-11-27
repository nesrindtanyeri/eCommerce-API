// controllers/orders.js
import Order from '../models/Order.js';
import OrderProduct from '../models/OrderProduct.js';
import Product from '../models/Product.js';

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: Product });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    let total = 0;
    for (const product of products) {
      const productData = await Product.findByPk(product.productId);
      if (!productData) {
        return res.status(404).json({ message: `Product not found: ${product.productId}` });
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
    res.status(500).json({ message: 'An error occurred while creating the order.', error });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const { products } = req.body;

    let total = 0;
    await OrderProduct.destroy({ where: { orderId: order.id } });

    for (const product of products) {
      const productData = await Product.findByPk(product.productId);
      if (!productData) {
        return res.status(404).json({ message: `Product not found: ${product.productId}` });
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
    res.status(500).json({ message: 'An error occurred while updating the order.', error });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    await OrderProduct.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.status(200).json({ message: 'Order successfully deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the order.', error });
  }
};
