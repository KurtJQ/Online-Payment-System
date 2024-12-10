import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/db.config.js';  // Import sequelize instance
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { authenticateJWT } from './middlewares/roleMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', authenticateJWT, adminRoutes);

app.get("/db-test", async (req, res) => {
  try {
      await sequelize.authenticate();  // Ensure sequelize is used for the test
      res.status(200).json({ success: true, message: "Database connected!" });
  } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ success: false, message: "Database connection failed.", error: error.message });
  }
});

// Database and Server Initialization
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));
  })
  .catch((error) => console.error('Database connection failed:', error));
