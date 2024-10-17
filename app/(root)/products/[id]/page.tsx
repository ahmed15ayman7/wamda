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
import { useTranslations } from 'next-intl';

import { getUserData } from '@/lib/actions/user.action';

interface Product {
  _id: string;
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  dataImage: string;
  rating: number;
}

// Fetch product from API
const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`/api/datas/${id}`);
  return data;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations('productDetail2');

  const { data: userData, isLoading: isLoadding } = useQuery({ queryKey: ['userData'], queryFn: () => getUserData() });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['data', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
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
          {t('errorFetching')}
        </Typography>
      </Box>
    );
  }

  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container spacing={4} mt={0}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={data.dataImage}
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
            <Typography variant="body1">
              {t('category')}: {data.categoryName}
            </Typography>
            <Typography variant="body1">
              {t('unit')}: {data.unit} ({data.unitName2})
            </Typography>

            {!isLoadding && userData.permissions && (
              <>
                {userData.permissions.salePrice && (
                  <Tooltip title={`${t('salePrice')}: $${data.salePrice}`} arrow>
                    <Typography variant="body2" color="textSecondary">{t('salePrice')}: ${data.salePrice}</Typography>
                  </Tooltip>
                )}
                {userData.permissions.wholesale1 && (
                  <Tooltip title={`${t('wholesale1')}: $${data.wholesale1}`} arrow>
                    <Typography variant="body2" color="textSecondary">{t('wholesale1')}: ${data.wholesale1}</Typography>
                  </Tooltip>
                )}
                {userData.permissions.wholesale2 && (
                  <Tooltip title={`${t('wholesale2')}: $${data.wholesale2}`} arrow>
                    <Typography variant="body2" color="textSecondary">{t('wholesale2')}: ${data.wholesale2}</Typography>
                  </Tooltip>
                )}
                {userData.permissions.exhibitSalePrice && (
                  <Tooltip title={`${t('exhibitSalePrice')}: $${data.exhibitSalePrice}`} arrow>
                    <Typography variant="body2" color="textSecondary">{t('exhibitSalePrice')}: ${data.exhibitSalePrice}</Typography>
                  </Tooltip>
                )}
                {userData.permissions.websiteSalePrice && (
                  <Tooltip title={`${t('websiteSalePrice')}: $${data.websiteSalePrice}`} arrow>
                    <Typography variant="body2" color="textSecondary">{t('websiteSalePrice')}: ${data.websiteSalePrice}</Typography>
                  </Tooltip>
                )}
              </>
            )}

            <Tooltip title={`${t('rating')}: ${data.rating} stars`} arrow>
              <Rating value={data.rating} readOnly />
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
