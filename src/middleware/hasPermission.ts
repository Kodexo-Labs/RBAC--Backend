import { NextFunction, Request, Response } from 'express';
import { getRoles } from '../services/role.service';

interface Role {
  [name: string]: {
    can: Array<String>;
    inherits: Array<String>;
  };
}

export const hasPermission =
  (perm: string) => async (req: Request, res: Response, next: NextFunction) => {
    const roleId = res.locals.user.role;
    const permission = perm;
    const params = {
      userId: req.body.userId,
      loggedInUserId: res.locals.user.id,
    };

    const allRoles = await getRoles();

    let roles: Role = {}
    for (let i = 0; i < allRoles.length; i++) {
      roles = {
        ...roles, ...{
          [allRoles[i].name]: {
            can: [...allRoles[i].permissions],
            inherits: [...allRoles[i].inherits],
          },
        },
      };
    } 

    const rbac = require('easy-rbac').create(roles);

    async function checkPermission(roleId: string, permission: string, params: any) {
      const result = await rbac.can(roleId, permission, params);
      return result;
    }

    const hasPermission = await checkPermission(roleId, permission, params);

    if (!hasPermission) {
      return res.status(403).send('Forbidden');
    }

    next();
  };
