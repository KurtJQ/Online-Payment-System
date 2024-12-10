import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'No Student found' });
    }

    const token = generateToken(user.id, user.role); // Include user role in the token
    res.status(200).json({ token, role: user.role, message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Register User
export const registerUser = async (req, res) => {
  const { email, username, password, firstName, lastName, phoneNumber, role } = req.body;

  try {
    const currentUser = req.user; // Assuming the middleware populates req.user

    // Role-based access control
    if (role === 'super_admin' && currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Only a super admin can create another super admin.' });
    }

    if (role === 'admin' && currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Only a super admin can create an admin.' });
    }

    if (role === 'student' && currentUser.role !== 'admin' && currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Only admins or super admins can create students.' });
    }

    // // Admin role can create students
    // if (role === 'student' && currentUser.role === 'admin') {
    //   return res.status(403).json({ message: 'admins can create students.' });
    // }

    // Check if email or username already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email is already taken.' });
    }

    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role: role || 'student', // Default role is 'student'
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const logoutUser = (req, res) => {
  try {
    req.user = null;

    // Clear the token from the client-side 
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user; // Assuming middleware populates req.user

  try {
    // Only super_admin and admin can delete users
    if (currentUser.role !== 'super_admin' && currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins or super admins can delete users.' });
    }

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Only super_admin can delete other super_admins
    if (user.role === 'super_admin' && currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Only a super admin can delete another super admin.' });
    }

    // Admins cannot delete other admins
    if (user.role === 'admin' && currentUser.role !== 'super_admin') {
      return res.status(403).json({ message: 'Only a super admin can delete an admin.' });
    }

    // Delete the user
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteAllStudents = async (req, res) => {
  const currentUser = req.user; // Assuming middleware populates req.user

  try {
    // Only super_admin or admin can delete all students
    if (currentUser.role !== 'super_admin' && currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Only super admins or admins can delete all students.' });
    }

    // Delete all users with the role of 'student'
    const deletedCount = await User.destroy({
      where: { role: 'student' },
    });

    res.status(200).json({ 
      message: `All student users deleted successfully. Count: ${deletedCount}` 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getAllUsers = async (req, res) => {
  const currentUser = req.user;

  try {
    // Only super_admin or admin can get all users
    if (currentUser.role !== 'super_admin' && currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Only super admins or admins can view all users.' });
    }

    const users = await User.findAll({
      attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'phoneNumber', 'role'],
    });

    res.status(200).json({ message: 'Users retrieved successfully.', users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;

  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'phoneNumber', 'role'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Optional: Add role-based restrictions (e.g., only allow access to certain roles)
    if (
      currentUser.role !== 'super_admin' &&
      currentUser.role !== 'admin' &&
      currentUser.id !== user.id
    ) {
      return res.status(403).json({ message: 'You do not have permission to view this user.' });
    }

    res.status(200).json({ message: 'User retrieved successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};