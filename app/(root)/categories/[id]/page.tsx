"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Spin } from 'antd';
import { getUserData } from '@/lib/actions/user.action';

const fetchCategory = async (id: string) => {
  const { data } = await axios.get(`/api/categories/${id}`);
  return data;
};

const CategoryDetailsPage = () => {
  const params = useParams(); // الحصول على المعرف من الـ URL
  const { id } = params;

  const { data: category, error, isLoading } = useQuery( { queryKey:['category', id],queryFn: () => fetchCategory(id as string),
    enabled: !!id,
  });
  const { data: userData, isLoading:isLoading2} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
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
          <Blog products={category.products} role={'user'} permissions={userData?userData.permissions:undefined} />
          )
        : (
          <Typography variant="body1">No products associated with this category.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CategoryDetailsPage;
