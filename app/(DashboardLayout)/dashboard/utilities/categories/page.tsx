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
import { getUserData } from '@/lib/actions/user.action';
import { useQuery } from '@tanstack/react-query';

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
    <Box p={4} className="bg-black/40 px-3 py-5 rounded-lg">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {t('categories')} {/* Use translation for the title */}
        </Typography>
        {!isLoadinguser && userData.role === "admin" &&
          <Tooltip title={t('addCategory')} arrow>
            <Link href="/dashboard/utilities/categories/add" passHref>
              <Button
                variant="contained"
                className='bg-[#ffffff] hover:bg-[#ffffff90] text-gray-900 font-bold border-gray-900 border shadow-md cursor-pointer'
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
                className='bg-[#ffffff] hover:bg-[#ffffff90] text-gray-900 font-bold border-gray-900 border shadow-md cursor-pointer'
                startIcon={<IconPlus />}
                component={motion.div}
                whileHover={{ scale: 1.1 }}
              >
                {t('addUnit')} {/* Use translation for the button */}
              </Button>
            </Link>
          </Tooltip>}
      </Box>
      <Grid container spacing={3} className=" px-3 py-5 ">
        {data?.map((category: any) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="bg-black/40 ">
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography color="textSecondary">{category.description}</Typography>

                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Tooltip title={t('viewCategory')} arrow>
                      <Link href={`/dashboard/utilities/categories/${category._id}`} passHref>
                        <Button
                          variant="outlined"
                          className='border-[#7ebe4b] text-[#7ebe4b] hover:text-[#7ebe4b90]'
                          startIcon={<IconEye />}
                        >
                          {t('viewCategory')} 
                        </Button>
                      </Link>
                    </Tooltip>
                    {!isLoadinguser && userData.role === "admin" &&
                    <>
                      <Tooltip title={t('editCategory')} arrow>
                        <IconButton  className='text-[#12117e] hover:text-[#12117e90]'
 onClick={() => handleEdit(category)}>
                          <IconEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('deleteCategory')} arrow>
                        <IconButton color={"error"} onClick={() => handleDelete(category._id)}>
                          <IconTrash />
                        </IconButton>
                      </Tooltip>
                    </>
                      }
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>


        {!isLoadinguser && userData.role === "admin" &&
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
      </Dialog>}
    </Box>
  );
};

export default CategoriesPage;
