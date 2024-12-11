import express from 'express';
import { LessonControllers } from './lesson.controller';
import { LessonValidation } from './lesson.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(LessonValidation.createLessonValidationSchema),
  LessonControllers.createLesson
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  LessonControllers.getAllLessons
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  LessonControllers.getSingleLesson
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(LessonValidation.updateLessonValidationSchema),
  LessonControllers.updateLesson
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  LessonControllers.deleteLesson
);

export const LessonRoutes = router;
