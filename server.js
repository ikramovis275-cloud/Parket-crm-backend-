const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const cronJob = require('./cron/cronJob');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Parket CRM API (PostgreSQL)',
      version: '1.0.0',
      description: 'API for Parket Warehouse Management with PostgreSQL',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to Database
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected...');
    return sequelize.sync(); // Creates tables if they don't exist
  })
  .then(() => console.log('Tables Synced...'))
  .catch(err => console.error('PostgreSQL Connection Error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

// Start Cron Job
cronJob.start();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
