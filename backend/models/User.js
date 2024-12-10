import { DataTypes } from 'sequelize';
import sequelize from '../db/db.config.js';  // Import sequelize from db.config.js

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure username is unique
    validate: {
      len: [3, 255], // Ensure the username has a minimum length
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Ensures the email format is correct
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true, // This is optional
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'student', // Default role is 'student'
  },
}, {
  // Additional options if necessary
  timestamps: true,
  tableName: 'users',
});

// Instead of sync, it's better to use migrations for production environments
// sequelize.sync({ alter: true }) can be risky if there are complex changes
// Example for development use only
sequelize.sync({ force: false }) // Avoiding `alter: true` here
  .then(() => console.log('User table created or updated successfully'))
  .catch(err => console.error('Error syncing User model:', err));

export default User;
