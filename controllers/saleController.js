const Sale = require('../models/Sale');

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({ order: [['createdAt', 'DESC']] });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSale = async (req, res) => {
  try {
    const { productCode, productName, qty, area, sumSom, sumUsd } = req.body;
    const sale = await Sale.create({
      time: new Date().toLocaleString(),
      productCode,
      productName,
      qty,
      area,
      sumSom,
      sumUsd
    });
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
