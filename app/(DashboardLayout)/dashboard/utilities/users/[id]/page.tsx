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
import { getUserById, updateUser } from '@/lib/actions/user.action'; // استيراد دالة تعديل اليوزر وجلب اليوزر
import { useRouter, useParams } from 'next/navigation'; // لاستعمال بيانات الرابط

const EditUserPage = ({params}:{params:{id:string}}) => {
  const { id } = params 
  const router = useRouter(); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    // جلب بيانات المستخدم الحالي عند تحميل الصفحة
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id as string); // جلب بيانات المستخدم باستخدام ID
        if (userData) {
          reset(userData); // تعبئة النموذج ببيانات المستخدم
        } else {
          toast.error('User not found.');
          // router.push('/users'); // إعادة التوجيه إذا لم يتم العثور على المستخدم
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data.');
      }
    };

    fetchUser();
  }, [id, reset, router]);

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await updateUser(id as string, data); // تعديل بيانات المستخدم
  
      if (result?.success) {
        toast.success(result.message); // عرض رسالة النجاح
        router.push('/users'); // إعادة التوجيه بعد النجاح
      } else {
        toast.error(result?.message || 'Failed to update user.'); // عرض رسالة الخطأ
      }
    } catch (error) {
      toast.error('An error occurred while updating user.');
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
        <h2>Edit User</h2>

        <Tooltip title="Edit the user's full name" arrow>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Edit the user's email address" arrow>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Edit the user's password" arrow>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Tooltip>

        <Tooltip title="Select the user's role" arrow>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Role"
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

        <Tooltip title="Click to update the user" arrow>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{ mt: 2 }}
          >
            Update User
          </Button>
        </Tooltip>

        <ToastContainer />
      </Box>
    </Container>
  );
};

export default EditUserPage;
