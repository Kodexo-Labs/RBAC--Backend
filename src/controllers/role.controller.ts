import { 
  createRole, 
  getRoles, 
  getRoleById, 
  updatePermission, 
  getRolesByInherit, 
  deleteRoleSideEffects,
  deleteRole as removeRole, 
} from './../services/role.service';
import { CreateRoleInput } from './../schemas/role.schema';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const addRole = async (
    req: Request<{}, {}, CreateRoleInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, permissions, inherits } = req.body;
  
      const role = await createRole({
        name,
        permissions,
        inherits
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          role,
        },
      });
    } catch (err:any) {
      next(err);
    }
  };

export const getAllRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await getRoles();
    res.status(200).json({
      status: 'success',
      data: {
        roles
      }
    })
  } catch (err:any) {
    next(err);
  }
}

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = req.params.id;

    const role = await getRoleById(roleId);

    const inheritedRoles = await getRolesByInherit(role?role.name:"");

    if (Array.isArray(inheritedRoles)) { 
      inheritedRoles?.forEach(async (r: any) => {
        let permissions = role?.permissions.concat(r.permissions);
        let inherits= r.inherits.filter((i: any) => i !== role?.name).concat(role?role?.inherits:[]);
  
        await deleteRoleSideEffects(r.id, permissions || [], inherits || [])
      })
    }
    
    await removeRole(roleId);
    res.status(200).json({
      status: 'success',
      message: 'Role Deleted Successfully'
    })
  } catch (err:any) {
    next(err);
  }
}

// Permission Controllers
export const addPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = req.params.id;
    const permissionsTobeAdded = [...req.body.permissions];

    const role = await getRoleById(roleId);

    let permissions = role?[...role?.permissions]:[];

    permissionsTobeAdded.forEach((p) => {
      permissions.forEach((i) => {
        if(i === p) {
          return next(new AppError(400, 'Permission Already Exists'))
        }
      })
    })

    permissions?.push(...permissionsTobeAdded);
    
    await updatePermission(roleId, permissions);

    const newUpdatedRole = await getRoleById(roleId);

    res.status(200).json({
      status: 'success',
      data: {
        newUpdatedRole
      }
    })
  } catch (err:any) {
    next(err);
  }
}

export const removePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roleId = req.params.id;
    const permissionsTobeRemoved = req.body.permission;

    const role = await getRoleById(roleId);

    let permissions = role?[...role?.permissions]:[];

    // Checking permission is present or not
    let isFound = false;

    permissions.forEach((i) => {
      if(i === permissionsTobeRemoved) {
        isFound = true;
      }
    })
    
    if(!isFound) {
      res.status(404).json({
        status: 'fail',
        message: 'Permission is not present' 
      })
    }

    const newUpdatedPermissions = permissions?.filter((p) => p !== permissionsTobeRemoved);
    
    await updatePermission(roleId, newUpdatedPermissions);

    const newUpdatedRole = await getRoleById(roleId);

    res.status(200).json({
      status: 'success',
      data: {
        newUpdatedRole
      }
    })
  } catch (err:any) {
    next(err);
  }
}