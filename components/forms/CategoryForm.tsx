import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '@/lib/schemas/categorySchema';
import { Spin } from 'antd';
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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('categoryForm'); // استخدام الترجمة
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
      return response.data.products;
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setisSubmitting(true);
      if (categoryData) {
        // تحديث الفئة إذا كانت البيانات موجودة
        await axios.put(`/api/categories/${categoryData._id}`, data);
        toast.success(t('categoryUpdated')); // استخدام الترجمة
      } else {
        // إضافة فئة جديدة إذا لم تكن البيانات موجودة
        await axios.post('/api/categories', data);
        toast.success(t('categoryCreated')); // استخدام الترجمة
      }
      if (onSuccess) onSuccess(); // استدعاء دالة النجاح
    } catch (error) {
      toast.error(t('errorSaving')); // استخدام الترجمة
      console.error(error);
    } finally {
      setisSubmitting(false);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/40 px-3 py-5 rounded-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-5">
        {/* Category Name */}
        <FormControl fullWidth>
          <TextField
            label={t('categoryName')} // استخدام الترجمة
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        </FormControl>

        {/* Description */}
        <FormControl fullWidth>
          <TextField
            label={t('description')} // استخدام الترجمة
            multiline
            rows={4}
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>{t('products')}</InputLabel> {/* استخدام الترجمة */}
          <Controller
            name="products"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Select
              {...field}
              style={{ border: 'none'}}
              multiple
              error={!!errors.products}
              >
              {!isLoading ?
                products?.map((product: any) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.itemName}
                  </MenuItem>
                ))
                :
                <MenuItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}  value={""}>
 
  <Spin size="large" />
                    </MenuItem>
}
              </Select>
            )}
          />
        </FormControl>
        {/* Submit Button */}
        <Button
          variant="contained"
          className='bg-[#ffffff] hover:bg-[#ffffff90] text-gray-900 font-bold border-gray-900 border shadow-md cursor-pointer'
          startIcon={<IconPlus />}
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : categoryData ? t('updateCategory') : t('addCategory')} {/* استخدام الترجمة */}
        </Button>
      </form>
    </motion.div>
  );
};

export default CategoryForm;
