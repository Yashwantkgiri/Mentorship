import express from 'express';
import { registerMentee, loginMentee } from '../controllers/menteeController.js';

const router = express.Router();

router.post('/register', registerMentee);
router.post('/login', loginMentee);

export default router;
