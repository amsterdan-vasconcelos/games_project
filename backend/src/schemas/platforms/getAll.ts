import z from 'zod';

export const querySchema = z.object({
  per_page: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  sort: z.string().optional(),
  dir: z.enum(['asc', 'desc']).optional(),
});

export type Query = z.infer<typeof querySchema>;
