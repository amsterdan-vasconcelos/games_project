import z from 'zod';

export const bodySchema = z.object({
  favorite: z.coerce.boolean(),
});

export type Body = z.infer<typeof bodySchema>;
