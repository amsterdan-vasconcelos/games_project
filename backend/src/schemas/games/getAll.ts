import z from 'zod';

export const querySchema = z.object({
  per_page: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  sort: z.string().optional(),
  dir: z.enum(['asc', 'desc']).optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  favorite: z.coerce.boolean().optional(),
});

export type Query = z.infer<typeof querySchema>;
