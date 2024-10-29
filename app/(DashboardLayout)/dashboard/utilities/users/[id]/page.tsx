'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/lib/schemas/userSchema'; // استيراد مخطط التحقق
import { TextField, Button, MenuItem, Container, Box, Tooltip } from '@mui/material';
import { IconUserPlus } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { getUserById, getUserData, updateUser } from '@/lib/actions/user.action'; // استيراد دالة تعديل اليوزر وجلب اليوزر
import { useRouter, useParams, notFound } from 'next/navigation'; // لاستعمال بيانات الرابط
import { useTranslations } from 'next-intl'; // استيراد useTranslations
import { useQuery } from '@tanstack/react-query';

const EditUserPage = ({params}:{params:{id:string}}) => {
  const { id } = params 
  const router = useRouter(); 
  const t = useTranslations("EditUserPage"); // استخدام useTranslations

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id as string); // جلب بيانات المستخدم باستخدام ID
        if (userData) {
          reset(userData); // تعبئة النموذج ببيانات المستخدم
        } else {
          toast.error(t('userNotFound'));
          // router.push('/users'); // إعادة التوجيه إذا لم يتم العثور على المستخدم
        }
      } catch (error) {
        toast.error(t('fetchError'));
      }
    };

    fetchUser();
  }, [id, reset, router, t]);

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await updateUser(id as string, data); // تعديل بيانات المستخدم
  
      if (result?.success) {
        toast.success(t('updateSuccess')); // عرض رسالة النجاح
        router.push('/users'); // إعادة التوجيه بعد النجاح
      } else {
        toast.error(result?.message || t('updateError')); // عرض رسالة الخطأ
      }
    } catch (error) {
      toast.error(t('updateError'));
    }
  };

  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 500,
          mx: 'auto',
          p: 3,
          boxShadow: 3,
        }}
      >
        <h2>{t('editUser')}</h2>

        <Tooltip title={t('nameTooltip')} arrow>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title={t('emailTooltip')} arrow>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title={t('passwordTooltip')} arrow>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('password')}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title={t('roleTooltip')} arrow>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('role')}
                select
                error={!!errors.role}
                helperText={errors.role?.message}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="admin">Admin (ادمن)</MenuItem>
                <MenuItem value="wholesale1">Wholesale 1 (جملة ١)</MenuItem>
                <MenuItem value="wholesale2">Wholesale 2 (جملة ٢)</MenuItem>
                <MenuItem value="retail">Retail (تجزئه)</MenuItem>
              </TextField>
            )}
          />
        </Tooltip>

        <Tooltip title={t('updateUser')} arrow>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{ mt: 2 }}
          >
            {t('updateUser')}
          </Button>
        </Tooltip>

        <ToastContainer />
      </Box>
    </Container>
  );
};

export default EditUserPage;
