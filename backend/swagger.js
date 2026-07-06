const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing products connected to NeonDB',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.route.js', './routes/*.js'], // Matches routes files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
