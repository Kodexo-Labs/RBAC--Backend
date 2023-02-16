import { removePermission } from './../controllers/role.controller';
import express from 'express';
import { addRole, getAllRoles, addPermission, deleteRole } from '../controllers/role.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { hasPermission } from '../middleware/hasPermission';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/', addRole);
router.get('/', getAllRoles)
router.delete('/:id', deleteRole)

// Add new Permission to role
router.patch('/permission/:id', addPermission)

// Remove permission from role
router.delete('/permission/:id', removePermission)



export default router;
