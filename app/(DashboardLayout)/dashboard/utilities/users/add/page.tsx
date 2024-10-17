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
import { addUser } from '@/lib/actions/user.action';

const AddUserPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const [permissions, setPermissions] = useState({
    wholesale1: false,
    wholesale2: false,
    exhibitSalePrice: false,
    websiteSalePrice: false,  // إضافة Website Sale Price
    salePrice: false,         // إضافة Sale Price
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
        toast.success(result.message); // عرض رسالة النجاح
        reset(); // إعادة تعيين النموذج بعد الإرسال
        setPermissions({ wholesale1: false, wholesale2: false, exhibitSalePrice: false, websiteSalePrice: false, salePrice: false }); // إعادة تعيين الصلاحيات
      } else {
        toast.error(result?.message || 'Failed to add user.'); // عرض رسالة الخطأ
      }
    } catch (error) {
      toast.error('An error occurred while adding user.');
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
        <h2>Add New User</h2>

        <Tooltip title="Enter the user's full name" arrow>
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

        <Tooltip title="Enter a valid email address" arrow>
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

        <Tooltip title="Enter a strong password" arrow>
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
                <MenuItem value="user">User (مستخدم)</MenuItem>
              </TextField>
            )}
          />
        </Tooltip>

        <Tooltip title="Assign user permissions" arrow>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.wholesale1}
                  onChange={handlePermissionChange}
                  name="wholesale1"
                />
              }
              label="Wholesale 1 (جملة ١)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.wholesale2}
                  onChange={handlePermissionChange}
                  name="wholesale2"
                />
              }
              label="Wholesale 2 (جملة ٢)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.exhibitSalePrice}
                  onChange={handlePermissionChange}
                  name="exhibitSalePrice"
                />
              }
              label="Exhibit Sale Price (سعر العرض)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.websiteSalePrice}
                  onChange={handlePermissionChange}
                  name="websiteSalePrice"
                />
              }
              label="Website Sale Price (سعر البيع على الموقع)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions.salePrice}
                  onChange={handlePermissionChange}
                  name="salePrice"
                />
              }
              label="Sale Price (سعر البيع)"
            />
          </FormGroup>
        </Tooltip>

        <Tooltip title="Click to add the user" arrow>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<IconUserPlus />}
            sx={{ mt: 2 }}
          >
            Add User
          </Button>
        </Tooltip>

        <ToastContainer />
      </Box>
    </Container>
  );
};

export default AddUserPage;
