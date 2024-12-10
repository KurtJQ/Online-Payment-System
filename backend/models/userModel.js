import { DataTypes } from 'sequelize';
import db from '../db/db.config.js';  // Assuming your db.js exports the Sequelize instance

const User = db.define('User', {
  // Fields
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suffix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'student',  // Default to student if not specified
    validate: {
      isIn: [['student', 'admin', 'superadmin']],  // Only these roles are allowed
    },
  },
}, {
  timestamps: true,  // Add createdAt and updatedAt fields automatically
  tableName: 'users',  // Table name
});

// Sync the model with the database (creates the table if not already created)
User.sync();

export default User;
