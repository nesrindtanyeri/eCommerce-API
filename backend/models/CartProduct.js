import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Cart from './Cart.js';
import Product from './Product.js';

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cart,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default CartProduct;
