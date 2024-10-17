import { z } from 'zod';

export const productSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  itemName: z.string().min(1, "Item name is required"),
  unit: z.string().min(1, "Unit is required"),
  categoryName: z.string().min(1, "Category is required"),
  category: z.string().min(1, "Category is required"),
  purchasePrice: z.string().min(0, "Must be positive"),
  salePrice: z.string().min(0, "Must be positive"),
  unitCost: z.string().min(0, "Must be positive"),
  wholesale1: z.string().min(0, "Must be positive"),
  wholesale2: z.string().min(0, "Must be positive"),
  _id: z.string().optional(),
  unitName2: z.string().optional(),
  exhibitSalePrice: z.string().min(0, "Must be positive"),
  websiteSalePrice: z.string().min(0, "Must be positive"),
  productImage: z.string().url("required image product"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be at most 5"),
});

export type ProductFormData2 = z.infer<typeof productSchema>;