const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.FLOAT, allowNull: false },
  totalArea: { type: DataTypes.FLOAT, allowNull: false },
  costUsd: { type: DataTypes.FLOAT, defaultValue: 0 },
  costSom: { type: DataTypes.FLOAT, defaultValue: 0 },
  saleUsd: { type: DataTypes.FLOAT, defaultValue: 0 },
  saleSom: { type: DataTypes.FLOAT, defaultValue: 0 },
  dollarRate: { type: DataTypes.FLOAT, defaultValue: 12500 },
  category: { type: DataTypes.ENUM('luxury', 'golden_art_floor'), allowNull: false },
});

module.exports = Product;
