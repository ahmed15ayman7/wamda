import { z } from 'zod';

export const unitSchema = z.object({
  name: z.string().min(3, { message: 'Category name must be at least 3 characters' }),
});

