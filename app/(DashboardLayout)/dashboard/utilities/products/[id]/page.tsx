'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Rating,
  Tooltip,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { IconBasket } from '@tabler/icons-react';
import Link from 'next/link'; // Import Link from Next.js

interface Product {
  _id: string;
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  purchasePrice: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  productImage: string;
  rating: number; // Assuming you have a rating field
}

const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Ensure the barcode exists before making the request
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error fetching product details.
        </Typography>
      </Box>
    );
  }

  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container spacing={4} mt={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={data.productImage}
              alt={data.itemName}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h4" component="h1">
              {data.itemName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Barcode: {data.barcode}
            </Typography>
            <Typography variant="body1">
              Category: {data.categoryName}
            </Typography>
            <Typography variant="body1">
              Unit: {data.unit} ({data.unitName2})
            </Typography>
            <Typography variant="body1">
              Purchase Price: ${data.purchasePrice}
            </Typography>
            <Typography variant="body1">
              Sale Price: <strong>${data.salePrice}</strong>
            </Typography>
            <Typography variant="body1">
              Unit Cost: ${data.unitCost}
            </Typography>
            <Typography variant="body1">
              Wholesale 1 Price: ${data.wholesale1}
            </Typography>
            <Typography variant="body1">
              Wholesale 2 Price: ${data.wholesale2}
            </Typography>
            <Typography variant="body1">
              Exhibit Sale Price: ${data.exhibitSalePrice}
            </Typography>
            <Typography variant="body1">
              Website Sale Price: ${data.websiteSalePrice}
            </Typography>
            
            {/* Product Rating */}
            <Tooltip title={`Rating: ${data.rating} stars`} arrow>
              <Rating value={data.rating} readOnly />
            </Tooltip>

            {/* Edit Product Button */}
            <Button
              variant="contained"
              color="primary"
              component={Link} // Use Link for navigation
              href={`/dashboard/utilities/products/edit/${data._id}`} // Link to edit page
              startIcon={<IconBasket />}
            >
              Edit Product
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
