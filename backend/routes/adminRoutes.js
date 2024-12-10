import { Router } from 'express';
import { authenticateJWT, isAdminOrSuperAdmin } from '../middlewares/roleMiddleware.js';
import User from '../models/User.js';

const adminRoutes = Router();

// Route to allow admin to edit user info
adminRoutes.put('/edit-user/:id', authenticateJWT, isAdminOrSuperAdmin, async (req, res) => {
  const { id } = req.params;
  const { email, username, firstName, lastName, phoneNumber, role } = req.body;

  try {
    // Ensure the user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Admins can only edit user info, but cannot change roles (unless they are super admins)
    if (req.user.role !== 'super_admin') {
      if (role && role !== 'user') {
        return res.status(403).json({ message: 'Admins cannot change roles' });
      }
    }

    // Update the user's information
    user.email = email || user.email;
    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: 'User info updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default adminRoutes;
