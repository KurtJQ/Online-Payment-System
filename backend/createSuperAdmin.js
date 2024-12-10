import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './models/User.js';  // Adjust this path if needed
import generateToken from './utils/generateToken.js'; // Adjust this path if needed

dotenv.config();  // Load environment variables

// Connect to the database
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const createSuperAdmin = async () => {
  const email = 'superadmin@example.com'; // Specify super admin's email
  const username = 'superadmin'; // Specify super admin's username
  const password = 'superadminpassword'; // Specify super admin's password
  const firstName = 'Super';
  const lastName = 'Admin';
  const phoneNumber = '1234567890';

  try {
    // Check if the super admin already exists
    const superAdminExists = await User.findOne({ where: { role: 'super_admin' } });
    if (superAdminExists) {
      console.log('Super admin already exists.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the super admin user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: 'super_admin', // Set role to 'super_admin'
    });

    // Generate a JWT token for the new super admin
    const token = generateToken(user.id, user.role);

    console.log('Super admin registered successfully!');
    console.log('User:', user);
    console.log('Token:', token);
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
};

createSuperAdmin();
