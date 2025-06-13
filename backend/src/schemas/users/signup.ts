import z from 'zod';

export const bodySchema = z
  .object({
    full_name: z
      .string()
      .min(3, { message: 'Full name must be at least 3 characters long.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/, {
        message:
          'Password must contain at least one letter, one number, and one special character.',
      }),
    confirm_password: z.string(),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: 'Password should be equal to confirm password',
    path: ['confirm_password'],
  });

export type Body = z.infer<typeof bodySchema>;
