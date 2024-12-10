import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUser,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateUser,
);

export const UserRoutes = router;