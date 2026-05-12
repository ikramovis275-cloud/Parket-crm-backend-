const cron = require('node-cron');
const Product = require('../models/Product');
const Sale = require('../models/Sale');

exports.start = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const productCount = await Product.count();
      const saleCount = await Sale.count();
      console.log(`[Cron Job] ${new Date().toLocaleString()}: Total Products: ${productCount}, Total Sales: ${saleCount}`);
    } catch (err) {
      console.error('[Cron Job Error]', err);
    }
  });
  console.log('Cron job scheduled.');
};
