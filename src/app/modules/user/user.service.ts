/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

const getUserByIdFromDB = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await User.create(payload);
  return newUser;
};

const updateUserFromDB = async (payload: any) => {
  const { id, updateData } = payload;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const result = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};
