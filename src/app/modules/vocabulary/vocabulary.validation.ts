import { z } from 'zod';

const createVocabularyValidationSchema = z.object({
  body: z.object({
    word: z.string().min(1, { message: 'Word is required.' }),
    pronunciation: z.string().min(1, { message: 'Pronunciation is required.' }),
    meaning: z.string().min(1, { message: 'Meaning is required.' }),
    whenToSay: z.string().min(1, { message: 'When to say is required.' }),
    lessonNo: z
      .number()
      .int()
      .positive({ message: 'Lesson number must be a positive integer.' }),
    adminEmail: z.string().email({ message: 'Invalid admin email.' }),
  }),
});

const updateVocabularyValidationSchema = z.object({
  body: z.object({
    word: z.string().min(1, { message: 'Word is required.' }).optional(),
    pronunciation: z
      .string()
      .min(1, { message: 'Pronunciation is required.' })
      .optional(),
    meaning: z.string().min(1, { message: 'Meaning is required.' }).optional(),
    whenToSay: z
      .string()
      .min(1, { message: 'When to say is required.' })
      .optional(),
    lessonNo: z
      .number()
      .int()
      .positive({ message: 'Lesson number must be a positive integer.' })
      .optional(),
    adminEmail: z
      .string()
      .email({ message: 'Invalid admin email.' })
      .optional(),
  }),
});

const getVocabulariesValidationSchema = z.object({
  query: z.object({
    lessonNo: z
      .string()
      .regex(/^\d+$/, { message: 'Lesson number must be a positive integer.' })
      .optional(),
  }),
});

export const VocabularyValidation = {
  createVocabularyValidationSchema,
  updateVocabularyValidationSchema,
  getVocabulariesValidationSchema,
};
