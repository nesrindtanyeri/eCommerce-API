import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/users.js';

const router = express.Router();

// Login user
router.post('/login', loginUser);

// Get all users
router.get('/', getUsers);

// Get user by ID
router.get('/:id', getUserById);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;
