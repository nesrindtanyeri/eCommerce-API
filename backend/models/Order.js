// models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import User from './User.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: true,
});

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;
