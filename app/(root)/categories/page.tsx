'use client';

import React from 'react';
import { useCategories } from '@/hooks/useCategories'; // Ensure this hook exists
import { Box, Card, CardContent, CircularProgress, Tooltip, Typography, Grid, Button } from '@mui/material';
import { IconEye } from '@tabler/icons-react'; // Use the appropriate icon
import { motion } from 'framer-motion';

import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const CategoriesPage = () => {
  const { data, error, isLoading, refetch } = useCategories();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
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
      </Box>

      <Grid container spacing={3}>
        {data?.map((category: any) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{category.name}</Typography>
                  <Typography color="textSecondary">{category.description}</Typography>

                  {/* Display the product length */}
                  <Typography variant="body2" color="textSecondary">
                    {category.products ? category.products.length : 0} Products
                  </Typography>

                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    {/* View Button with next/link */}
                    <Tooltip title="View Category" arrow>
                      <Link href={`/categories/${category._id}`} passHref>
                        <Button
                          variant="outlined"
                          startIcon={<IconEye />}
                        >
                          View
                        </Button>
                      </Link>
                    </Tooltip>
                  </Box>
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
