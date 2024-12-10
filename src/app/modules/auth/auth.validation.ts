import { z } from 'zod';

const userCreationValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    role: z.enum(['admin', 'user'], {
      message: 'Role must be one of: admin, user.',
    }),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidation = {
  userCreationValidationSchema,
  loginValidationSchema,
};
