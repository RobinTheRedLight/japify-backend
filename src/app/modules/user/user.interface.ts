/* eslint-disable no-unused-vars */

import { Document, Model } from 'mongoose';

export type TUserRole = 'admin' | 'user';

export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  image: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}