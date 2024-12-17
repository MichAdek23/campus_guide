// config.js
require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/campus-guide',  // Default to local DB URI if not in .env
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',  // Default secret if not in .env
};
