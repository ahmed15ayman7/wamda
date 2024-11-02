'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/lib/schemas/userSchema'; // استيراد مخطط التحقق
import { TextField, Button, MenuItem, Container, Box, Tooltip, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { IconUserPlus } from '@tabler/icons-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { addUser, getUserData } from '@/lib/actions/user.action';
import { useTranslations } from 'next-intl'; // استخدام next-intl لدعم الترجمة
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

const AddUserPage: React.FC = () => {
  const  t  = useTranslations(); // استدعاء دالة الترجمة
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
  const [permissions, setPermissions] = useState({
    wholesale1: false,
    wholesale2: false,
    exhibitSalePrice: false,
    websiteSalePrice: false,
    salePrice: false,
  });

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      const finalData = {
        ...data,
        permissions,
      };

      const result = await addUser(finalData);

      if (result?.success) {
        toast.success(result.message);
        reset();
        setPermissions({ wholesale1: false, wholesale2: false, exhibitSalePrice: false, websiteSalePrice: false, salePrice: false });
      } else {
        toast.error(result?.message || 'Failed to add user.');
      }
    } catch (error) {
      toast.error('An error occurred while adding user.');
    }
  };

  return (
    <Container  component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
        className="bg-black/40 px-3 py-5 rounded-lg"
      >
        <h2>{t('addUser')}</h2>

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
                <MenuItem value="admin" className="text-black">{t('admin')}</MenuItem>
                <MenuItem value="user" className="text-black">{t('user')}</MenuItem>
              </TextField>
            )}
          />
        </Tooltip>

        <Tooltip title={t('permissions')} arrow>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.wholesale1}
                  onChange={handlePermissionChange}
                  name="wholesale1"
                />
              }
              label={t('wholesale1')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.wholesale2}
                  onChange={handlePermissionChange}
                  name="wholesale2"
                />
              }
              label={t('wholesale2')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.exhibitSalePrice}
                  onChange={handlePermissionChange}
                  name="exhibitSalePrice"
                />
              }
              label={t('exhibitSalePrice')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.websiteSalePrice}
                  onChange={handlePermissionChange}
                  name="websiteSalePrice"
                />
              }
              label={t('websiteSalePrice')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.salePrice}
                  onChange={handlePermissionChange}
                  name="salePrice"
                />
              }
              label={t('salePrice')}
            />
          </FormGroup>
        </Tooltip>

        <Tooltip title={t('addUserButton')} arrow>
          <Button
            type="submit"
            variant="contained"
            className='bg-[#7ebe4b] hover:bg-[#7ebe4b90]'
            startIcon={<IconUserPlus />}
            sx={{ mt: 2 }}
          >
            {t('addUserButton')}
          </Button>
        </Tooltip>

        <ToastContainer />
      </Box>
    </Container>
  )
};

export default AddUserPage;
