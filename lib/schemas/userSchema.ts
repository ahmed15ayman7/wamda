import { z } from 'zod';

// تعديل مخطط Zod
export const userSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'user'], {message:'Role is required'}),
  permissions: z.object({
    wholesale1: z.boolean().optional(),
    wholesale2: z.boolean().optional(),
    exhibitSalePrice: z.boolean().optional(),
    websiteSalePrice: z.boolean().optional(),  // إضافة Website Sale Price
    salePrice: z.boolean().optional(),         // إضافة Sale Price
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
