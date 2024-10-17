import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(3, { message: 'Category name must be at least 3 characters' }),
  description: z.string().optional(),
  products: z.array(z.string()).optional(), // This will hold product IDs as strings
});

