import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
});

export default Cart;
