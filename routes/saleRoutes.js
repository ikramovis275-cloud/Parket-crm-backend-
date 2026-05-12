const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     responses:
 *       200:
 *         description: List of sales
 */
router.get('/', saleController.getAllSales);

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Record a new sale
 *     responses:
 *       201:
 *         description: Sale recorded
 */
router.post('/', saleController.createSale);

module.exports = router;
