import { findUserById } from './../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { getAllUsers, deleteUser as removeUser } from '../services/user.service'
import AppError from '../utils/appError';

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();

    res.status(200).status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);

    if(!user) {
      return next(new AppError(404, 'user doesnt exist'))
    }
    
    await removeUser(userId);

    res.status(200).status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (err: any) {
    next(err);
  }
};
