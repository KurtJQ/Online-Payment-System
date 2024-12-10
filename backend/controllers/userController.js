import bcrypt from 'bcrypt';
import User from '../models/User.js';  // Import the User model
import generateToken from '../utils/generateToken.js';  // Assuming you have a utility to generate JWT tokens

// Register a new user (Admin, Superadmin, or Student)
export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber, role } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: role || 'student',  // Default to 'student' if no role provided
    });

    // Generate a JWT token for the new user
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
