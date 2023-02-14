import { NextFunction, Request, Response } from 'express';
import {checkPermission} from '../utils/rbac';

export const hasPermission = (perm: string) => async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const roleId = res.locals.user.role;
    const permission = perm;
    const params = {
      userId: req.body.userId,
      loggedInUserId: res.locals.user.id
    };
   
    const hasPermission = await checkPermission(roleId, permission, params);
  
    if (!hasPermission) {
      return res.status(403).send("Forbidden");
    }

    next();
}