import z from 'zod';

export const bodySchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long.' }),
  image_url: z.string().optional(),
  company: z.string().optional(),
  acquisition_year: z.date().optional(),
});

export type Body = z.infer<typeof bodySchema>;
