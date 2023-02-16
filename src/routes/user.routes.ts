import express from 'express';
import { getMeHandler, getUsers, deleteUser } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { hasPermission } from '../middleware/hasPermission';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', getMeHandler);

router.get('/', hasPermission('user:read'), getUsers)
router.delete('/:id', hasPermission('user:delete'), deleteUser)

export default router;
