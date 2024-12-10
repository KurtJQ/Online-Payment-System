import express from 'express';
import { logoutUser, 
        getUserById, 
        getAllUsers, 
        deleteAllStudents, 
        deleteUser, 
        registerUser, 
        loginUser } from '../controllers/authController.js';

import { authenticateJWT, isAdminOrSuperAdmin} from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);
router.post('/register', authenticateJWT, isAdminOrSuperAdmin, registerUser);
router.post('/logout', logoutUser);

//delete
router.delete('/users/:id', authenticateJWT, deleteUser);
router.delete('/students', authenticateJWT, deleteAllStudents);

//getusers
router.get('/users/:id', authenticateJWT, getUserById);
router.get('/users', authenticateJWT, getAllUsers);


export default router;
