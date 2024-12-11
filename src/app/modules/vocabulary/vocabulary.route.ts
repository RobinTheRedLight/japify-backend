import express from 'express';
import { VocabularyControllers } from './vocabulary.controller';
import { VocabularyValidation } from './vocabulary.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(VocabularyValidation.createVocabularyValidationSchema),
  VocabularyControllers.createVocabulary
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(VocabularyValidation.getVocabulariesValidationSchema),
  VocabularyControllers.getAllVocabularies
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  VocabularyControllers.getSingleVocabulary
);


router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(VocabularyValidation.updateVocabularyValidationSchema),
  VocabularyControllers.updateVocabulary
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  VocabularyControllers.deleteVocabulary
);

export const VocabularyRoutes = router;
