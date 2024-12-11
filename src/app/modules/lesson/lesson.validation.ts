import { z } from 'zod';

const createLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Lesson name is required.' }),
    number: z.number().int().positive({ message: 'Lesson number must be a positive integer.' }),
  }),
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Lesson name is required.' }).optional(),
    number: z.number().int().positive({ message: 'Lesson number must be a positive integer.' }).optional(),
  }),
});

export const LessonValidation = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
