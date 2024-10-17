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

// دالة لجلب المنتج من الـ API
const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`/api/datas/${id}`);
  return data;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userData,isLoading:isLoadding } = useQuery({queryKey:['userData'],queryFn:()=> getUserData()});
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
          Error fetching data details.
        </Typography>
      </Box>
    );
  }



  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container spacing={4} mt={0}>
        {/* صورة المنتج */}
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

        {/* تفاصيل المنتج */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography variant="h4" component="h1">
              {data.itemName}
            </Typography>
            {/* <Typography variant="subtitle1" color="textSecondary">
              Barcode: {data.barcode}
            </Typography> */}
            <Typography variant="body1">
              Category: {data.categoryName}
            </Typography>
            <Typography variant="body1">
              Unit: {data.unit} ({data.unitName2})
            </Typography>

          { !isLoadding && userData.permissions && (

                  <>
                    {userData.permissions.salePrice && (
                      <Tooltip title={`Sale Price: $${data.salePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">Sale Price: ${data.salePrice}</Typography>
                      </Tooltip>
                    )}
                    {userData.permissions.wholesale1 && (
                      <Tooltip title={`Wholesale Price 1: $${data.wholesale1}`} arrow>
                        <Typography variant="body2" color="textSecondary">Wholesale 1: ${data.wholesale1}</Typography>
                      </Tooltip>
                    )}
                    {userData.permissions.wholesale2 && (
                      <Tooltip title={`Wholesale Price 2: $${data.wholesale2}`} arrow>
                        <Typography variant="body2" color="textSecondary">Wholesale 2: ${data.wholesale2}</Typography>
                      </Tooltip>
                    )}
                    {userData.permissions.exhibitSalePrice && (
                      <Tooltip title={`Exhibit Sale Price: $${data.exhibitSalePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">Exhibit Sale Price: ${data.exhibitSalePrice}</Typography>
                      </Tooltip>
                    )}
                    {userData.permissions.websiteSalePrice && (
                      <Tooltip title={`Website Sale Price: $${data.websiteSalePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">Website Sale Price: ${data.websiteSalePrice}</Typography>
                      </Tooltip>
                    )}
                  </>)}

            <Tooltip title={`Rating: ${data.rating} stars`} arrow>
              <Rating value={data.rating} readOnly />
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
