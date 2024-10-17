'use client';

import React, { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
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

const CategoriesPage = () => {
  const t = useTranslations('CategoriesPage'); // Get translation function for this page
  const { data, error, isLoading, refetch } = useCategories();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success(t('deleteSuccess')); // Use translation for success message
      refetch(); // Refresh categories after deletion
    } catch (error) {
      toast.error(t('deleteFailure')); // Use translation for error message
    }
  };

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
          {t('categories')} {/* Use translation for the title */}
        </Typography>

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
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {data?.map((category: any) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography color="textSecondary">{category.description}</Typography>

                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Tooltip title={t('viewCategory')} arrow>
                      <Link href={`/dashboard/utilities/categories/${category._id}`} passHref>
                        <Button
                          variant="outlined"
                          startIcon={<IconEye />}
                        >
                          {t('viewCategory')} {/* Use translation for the button */}
                        </Button>
                      </Link>
                    </Tooltip>

                    <Tooltip title={t('editCategory')} arrow>
                      <IconButton onClick={() => handleEdit(category)}>
                        <IconEdit />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={t('deleteCategory')} arrow>
                      <IconButton onClick={() => handleDelete(category._id)}>
                        <IconTrash />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Edit Category Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>{t('editCategory')}</DialogTitle> {/* Use translation for the dialog title */}
        <DialogContent>
          {selectedCategory && (
            <CategoryForm
              categoryData={selectedCategory} 
              onSuccess={() => {
                refetch(); 
                handleCloseEditDialog();
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            {t('cancel')} {/* Add a translation for cancel if necessary */}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPage;
