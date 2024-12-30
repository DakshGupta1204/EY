import { Router,Request,Response } from 'express';
import { getUsers, createUser, registerUser, loginUser } from '../controllers/userControllers';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
