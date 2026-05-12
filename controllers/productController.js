const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { code, name, size, quantity, costUsd, saleUsd, dollarRate, category } = req.body;
    const costSom = parseFloat(costUsd) * parseFloat(dollarRate);
    const saleSom = parseFloat(saleUsd) * parseFloat(dollarRate);
    const totalArea = parseFloat(quantity) * parseFloat(size);

    const product = await Product.create({
      code, name, size, quantity, totalArea, costUsd, costSom, saleUsd, saleSom, dollarRate, category
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, size, quantity, costUsd, saleUsd, dollarRate, category } = req.body;
    
    const updates = {
      code, name, size, quantity, costUsd, saleUsd, dollarRate, category,
      costSom: parseFloat(costUsd) * parseFloat(dollarRate),
      saleSom: parseFloat(saleUsd) * parseFloat(dollarRate),
      totalArea: parseFloat(quantity) * parseFloat(size)
    };

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    await product.update(updates);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty, area } = req.body;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const newQty = product.quantity - parseFloat(qty);
    const newArea = product.totalArea - parseFloat(area);

    if (newQty <= 0) {
      await product.destroy();
    } else {
      await product.update({ quantity: newQty, totalArea: newArea });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
