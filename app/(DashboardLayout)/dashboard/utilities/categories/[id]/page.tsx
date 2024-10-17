"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Spin } from 'antd';
import CategoryForm from '@/components/forms/CategoryForm';
const fetchCategory = async (id: string) => {
  const { data } = await axios.get(`/api/categories/${id}`);
  return data;
};

const updateCategory = async (id: string, updatedData: any) => {
  const { data } = await axios.put(`/api/categories/${id}`, updatedData);
  return data;
};

const CategoryDetailsPage = () => {
  const params = useParams(); 
  const { id } = params;
  const [openEditDialog, setOpenEditDialog] = useState(false); // إدارة الـ Dialog
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // الفئة المختارة للتحرير

  const { data: category, error, isLoading, refetch } = useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategory(id as string),
    enabled: !!id,
  });

  // State لإدارة ظهور الـ Dialog وبيانات الفئة المعدلة
  const [open, setOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState({
    name: '',
    description: '',
  });

  const handleEditClick = () => {
    setEditedCategory({ name: category.name, description: category.description || '' });
    setOpen(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // إغلاق الـ Dialog
    setSelectedCategory(null); // إعادة تعيين الفئة المختارة
  };

  // حفظ التعديلات
  const handleSave = async () => {
    await updateCategory(id as string, editedCategory);
    setOpen(false);
    refetch(); // إعادة جلب البيانات بعد التحديث
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">Error loading category details</Typography>;
  }

  return (
    <Box p={4}>
      {/* زر التعديل */}
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Edit
      </Button>

      {/* عرض معلومات الفئة */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {category.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic', color: 'gray' }}>
        {category.description || 'No description available'}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Products:
      </Typography>

      <Grid container spacing={3}>
        {category.products.length > 0 ? (
          <Blog products={category.products} role='admin' />
        ) : (
          <Typography variant="body1">No products associated with this category.</Typography>
        )}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          {category && (
            <CategoryForm
              categoryData={category} 
              onSuccess={() => {
                refetch(); 
                handleCloseEditDialog(); // إغلاق الـ Dialog بعد النجاح
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryDetailsPage;