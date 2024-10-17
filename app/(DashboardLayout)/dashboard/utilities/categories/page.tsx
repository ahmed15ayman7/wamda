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

const CategoriesPage = () => {
  const { data, error, isLoading, refetch } = useCategories();
  const [openEditDialog, setOpenEditDialog] = useState(false); // إدارة الـ Dialog
  const [selectedCategory, setSelectedCategory] = useState<any>(null); // الفئة المختارة للتحرير

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      toast.success('Category deleted successfully');
      refetch(); // Refresh categories after deletion
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category); // ضبط الفئة المختارة
    setOpenEditDialog(true); // فتح الـ Dialog
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // إغلاق الـ Dialog
    setSelectedCategory(null); // إعادة تعيين الفئة المختارة
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
    );
  }

  if (error) {
    return <Typography color="error">Error loading categories</Typography>;
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>

        {/* Add Category Button */}
        <Tooltip title="Add New Category" arrow>
          <Link href="/dashboard/utilities/categories/add" passHref>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IconPlus />}
              component={motion.div}
              whileHover={{ scale: 1.1 }}
            >
              Add Category
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
                    {/* View Button with next/link */}
                    <Tooltip title="View Category" arrow>
                      <Link href={`/dashboard/utilities/categories/${category._id}`} passHref>
                        <Button
                          variant="outlined"
                          startIcon={<IconEye />}
                        >
                          View
                        </Button>
                      </Link>
                    </Tooltip>

                    {/* Edit Icon with Tooltip */}
                    <Tooltip title="Edit Category" arrow>
                      <IconButton onClick={() => handleEdit(category)}>
                        <IconEdit />
                      </IconButton>
                    </Tooltip>

                    {/* Delete Icon with Tooltip */}
                    <Tooltip title="Delete Category" arrow>
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <CategoryForm
              categoryData={selectedCategory} 
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

export default CategoriesPage;
