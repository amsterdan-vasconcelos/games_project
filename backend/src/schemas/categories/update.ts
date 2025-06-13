import z from 'zod';

export const bodySchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must contain at least 3 characters.' })
    .max(50, { message: 'Title must not exceed 50 characters.' }),
  description: z
    .string()
    .max(100, { message: 'Description must not exceed 100 characters.' })
    .optional(),
});

export type Body = z.infer<typeof bodySchema>;
