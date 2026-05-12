const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sale = sequelize.define('Sale', {
  time: { type: DataTypes.STRING, allowNull: false },
  productCode: { type: DataTypes.STRING },
  productName: { type: DataTypes.STRING, allowNull: false },
  qty: { type: DataTypes.FLOAT, allowNull: false },
  area: { type: DataTypes.FLOAT, allowNull: false },
  sumSom: { type: DataTypes.FLOAT, allowNull: false },
  sumUsd: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Sale;
