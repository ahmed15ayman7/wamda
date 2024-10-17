"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Spin } from 'antd';
import CategoryForm from '@/components/forms/CategoryForm';
import { useTranslations } from 'next-intl';

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
  const [openEditDialog, setOpenEditDialog] = useState(false); 
  const [editedCategory, setEditedCategory] = useState({
    name: '',
    description: '',
  });

  const { data: category, error, isLoading, refetch } = useQuery({
    queryKey: ['category', id],
    queryFn: () => fetchCategory(id as string),
    enabled: !!id,
  });

  const t = useTranslations('categoryDetails'); // استخدام 'categoryDetails' للحصول على الترجمة

  const handleEditClick = () => {
    setEditedCategory({ name: category.name, description: category.description || '' });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); 
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
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        {t('edit')}
      </Button>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {category.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontStyle: 'italic', color: 'gray' }}>
        {category.description || t('noDescription')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('products')}
      </Typography>

      <Grid container spacing={3}>
        {category.products.length > 0 ? (
          <Blog products={category.products} role='admin' />
        ) : (
          <Typography variant="body1">{t('noProducts')}</Typography>
        )}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>{t('dialogTitle')}</DialogTitle>
        <DialogContent>
          {category && (
            <CategoryForm
              categoryData={category} 
              onSuccess={() => {
                refetch(); 
                handleCloseEditDialog(); 
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            {t('cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryDetailsPage;
