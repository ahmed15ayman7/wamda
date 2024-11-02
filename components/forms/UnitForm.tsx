import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitSchema } from '@/lib/schemas/unitSchema';
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

interface UnitFormData {
  name: string;
}

interface UnitFormProps {
  unitData?: any; // بيانات الفئة المحددة للتحرير
  onSuccess?: () => void; // دالة استدعاء عند النجاح
}

const UnitForm: React.FC<UnitFormProps> = ({ unitData, onSuccess }) => {
  const router = useRouter();
  const t = useTranslations('unitForm'); // استخدام الترجمة
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: unitData || {}, // استخدام البيانات الافتراضية من الفئة المحددة
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  useEffect(() => {
    if (unitData) {
      reset(unitData); // تحديث النموذج ببيانات الفئة المحددة
    }
  }, [unitData, reset]);


  const onSubmit = async (data: UnitFormData) => {
    try {
      setisSubmitting(true);
      if (unitData) {
        // تحديث الفئة إذا كانت البيانات موجودة
        await axios.put(`/api/units/${unitData._id}`, data);
        toast.success(t('unitUpdated')); // استخدام الترجمة
      } else {
        // إضافة فئة جديدة إذا لم تكن البيانات موجودة
        await axios.post('/api/units', data);
        toast.success(t('unitCreated')); // استخدام الترجمة
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
        {/* Unit Name */}
        <FormControl fullWidth>
          <TextField
            label={t('unitName')} // استخدام الترجمة
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
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
          {isSubmitting ? <CircularProgress size={24} /> : unitData ? t('updateUnit') : t('addUnit')} {/* استخدام الترجمة */}
        </Button>
      </form>
    </motion.div>
  );
};

export default UnitForm;
