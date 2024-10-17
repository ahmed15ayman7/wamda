import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/lib/schemas/categorySchema';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface CategoryFormData {
  name: string;
  description: string;
  products: string[];
}

interface CategoryFormProps {
  categoryData?: any; // بيانات الفئة المحددة للتحرير
  onSuccess?: () => void; // دالة استدعاء عند النجاح
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryData, onSuccess }) => {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryData || {}, // استخدام البيانات الافتراضية من الفئة المحددة
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  useEffect(() => {
    if (categoryData) {
      reset(categoryData); // تحديث النموذج ببيانات الفئة المحددة
    }
  }, [categoryData, reset]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('/api/products');
      return response.data;
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setisSubmitting(true);
      if (categoryData) {
        // تحديث الفئة إذا كانت البيانات موجودة
        await axios.put(`/api/categories/${categoryData._id}`, data);
        toast.success('Category updated successfully!');
      } else {
        // إضافة فئة جديدة إذا لم تكن البيانات موجودة
        await axios.post('/api/categories', data);
        toast.success('Category created successfully!');
      }
      if (onSuccess) onSuccess(); // استدعاء دالة النجاح
    } catch (error) {
      toast.error('Error saving category');
      console.error(error);
    } finally {
      setisSubmitting(false);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Category Name */}
        <FormControl fullWidth>
          <TextField
            label="Category Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        </FormControl>

        {/* Description */}
        <FormControl fullWidth>
          <TextField
            label="Description"
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        </FormControl>

        {/* Products */}
        <FormControl fullWidth>
          <InputLabel>Products</InputLabel>
          <Controller
            name="products"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                error={!!errors.products}
              >
                {products?.map((product: any) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<IconPlus />}
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : categoryData ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </motion.div>
  );
};

export default CategoryForm;
