import express from 'express';
import { getMeHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { hasPermission } from '../middleware/hasPermission';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.get('/me', hasPermission('see-profile'), getMeHandler);

export default router;
