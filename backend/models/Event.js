import { DataTypes } from 'sequelize';
import sequelize from '../db/db.config.js';  // Import sequelize from db.config.js

// Define the Event model using the imported sequelize instance
const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Add any additional fields here
});

export default Event;
