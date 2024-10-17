'use client';

import ProductForm from "@/components/forms/AddProduct";
import { ProductFormData2 } from "@/lib/schemas/productSchema";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";


  
  const fetchProduct = async (id: string): Promise<ProductFormData2> => {
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
  return(
    <div className="">
        <ProductForm product={data}/>
    </div>
  )}
  export default ProductDetailPage;