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
import { IconEdit } from '@tabler/icons-react';
import Link from 'next/link'; // Import Link from Next.js
import { useTranslations } from 'next-intl';
import { getUserData } from '@/lib/actions/user.action';

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
  const t = useTranslations('productDetail'); // استخدام 'productDetail' للحصول على الترجمة
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // Ensure the barcode exists before making the request
  });

  if (isLoading || isLoadinguser) {
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
          {t('errorFetching')}
        </Typography>
      </Box>
    );
  }

  return (
    <Container component={motion.div} className="bg-black/40 px-3 py-5 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
              {t('barcode')}: {data.barcode}
            </Typography>
            <Typography variant="body1">
              {t('category')}: {data.categoryName}
            </Typography>
            <Typography variant="body1">
              {t('unit')}: {data.unit} ({data.unitName2})
            </Typography>
            <Typography variant="body1">
              {t('purchasePrice')}: ${data.purchasePrice}
            </Typography>
            <Typography variant="body1">
              {t('salePrice')}: <strong>${data.salePrice}</strong>
            </Typography>
            <Typography variant="body1">
              {t('unitCost')}: ${data.unitCost}
            </Typography>
            <Typography variant="body1">
              {t('wholesale1')}: ${data.wholesale1}
            </Typography>
            <Typography variant="body1">
              {t('wholesale2')}: ${data.wholesale2}
            </Typography>
            <Typography variant="body1">
              {t('exhibitSalePrice')}: ${data.exhibitSalePrice}
            </Typography>
            <Typography variant="body1">
              {t('websiteSalePrice')}: ${data.websiteSalePrice}
            </Typography>
            
            {/* Product Rating */}
            {/* <Tooltip title={`Rating: ${data.rating} stars`} arrow>
              <Rating value={data.rating} readOnly />
            </Tooltip> */}

            {
              userData.role==="admin"&&
            <Button
            variant="contained"
            className='bg-[#ffffff] hover:bg-[#ffffff90] text-gray-900 font-bold border-gray-900 border shadow-md cursor-pointer'
            component={Link} // Use Link for navigation
            href={`/dashboard/utilities/products/edit/${data._id}`} // Link to edit page
            startIcon={<IconEdit />}
            >
              {t('editProduct')}
            </Button>
            }
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
