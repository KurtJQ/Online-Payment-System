import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false,
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();  // Try authenticating the connection
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);  // Exit the process if the connection fails
  }
}

testConnection();  // Run the connection test

export default sequelize;  // Export the Sequelize instance
