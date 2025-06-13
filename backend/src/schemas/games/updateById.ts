import z from 'zod';

export const bodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image_url: z.string().url().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  platform: z.string().min(1, 'Platform is required'),
  status: z.string().min(1, 'Status is required'),
  favorite: z.boolean().optional(),
  acquisition_date: z.coerce.date().optional(),
  finish_date: z.coerce.date().optional(),
});

export type Body = z.infer<typeof bodySchema>;
