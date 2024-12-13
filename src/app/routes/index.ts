import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { VocabularyRoutes } from '../modules/vocabulary/vocabulary.route';
import { LessonRoutes } from '../modules/lesson/lesson.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/lessons',
    route: LessonRoutes,
  },
  {
    path: '/vocabularies',
    route: VocabularyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
