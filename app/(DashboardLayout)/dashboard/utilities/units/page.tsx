'use client';

import React, { useState } from 'react';
import { useUnits } from '@/hooks/useCategories';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Tooltip,
  Typography,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { IconTrash, IconEdit, IconEye, IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import CategoryForm from '@/components/forms/CategoryForm';
import { Spin } from 'antd';
import { useTranslations } from 'next-intl'; // Make sure to import this
import { getUserData } from '@/lib/actions/user.action';
import { useQuery } from '@tanstack/react-query';

const CategoriesPage = () => {
  const t = useTranslations('UnitsPage'); // Get translation function for this page
  const { data, error, isLoading, refetch } = useUnits();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/units/${id}`);
      toast.success(t('deleteSuccess')); // Use translation for success message
      refetch(); // Refresh categories after deletion
    } catch (error) {
      toast.error(t('deleteFailure')); // Use translation for error message
    }
  };
  const { data: userData, isLoading: isLoadinguser } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{t('errorLoading')}</Typography>; // Use translation for error message
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {t('units')} {/* Use translation for the title */}
        </Typography>
        {!isLoadinguser && userData.role === "admin" &&
          <Tooltip title={t('addCategory')} arrow>
            <Link href="/dashboard/utilities/categories/add" passHref>
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconPlus />}
                component={motion.div}
                whileHover={{ scale: 1.1 }}
              >
                {t('addCategory')} {/* Use translation for the button */}
              </Button>
            </Link>
          </Tooltip>}
        {!isLoadinguser && userData.role === "admin" &&
          <Tooltip title={t('addUnit')} arrow>
            <Link href="/dashboard/utilities/units/add" passHref>
              <Button
                variant="contained"
                color="primary"
                startIcon={<IconPlus />}
                component={motion.div}
                whileHover={{ scale: 1.1 }}
              >
                {t('addUnit')} {/* Use translation for the button */}
              </Button>
            </Link>
          </Tooltip>}
      </Box>
      <Grid container spacing={3}>
        {data?.map((category: any) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                    {!isLoadinguser && userData.role === "admin" &&
                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                      <Tooltip title={t('deleteUnit')} arrow>
                        <IconButton onClick={() => handleDelete(category._id)}>
                          <IconTrash />
                        </IconButton>
                      </Tooltip>
                  </Box>
                      }
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default CategoriesPage;
