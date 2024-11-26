import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.js';
import validate from '../middleware/validate.js';
import { userSchema } from '../schemas/userSchemas.js';

const router = express.Router();

// Kullanıcı listesi
router.get('/', getUsers);

// Belirli bir kullanıcıyı getirme
router.get('/:id', getUserById);

// Yeni kullanıcı oluşturma
router.post('/', validate(userSchema), createUser);

// Kullanıcıyı güncelleme
router.put('/:id', validate(userSchema), updateUser);

// Kullanıcıyı silme
router.delete('/:id', deleteUser);

export default router;

