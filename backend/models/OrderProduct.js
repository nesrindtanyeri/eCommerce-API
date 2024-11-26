// models/OrderProduct.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Order from './Order.js';
import Product from './Product.js';

const OrderProduct = sequelize.define('OrderProduct', {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'order_products',
  timestamps: false,
});

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

export default OrderProduct;
