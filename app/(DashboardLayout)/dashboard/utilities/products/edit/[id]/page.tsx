'use client';

import ProductForm from "@/components/forms/AddProduct";
import { getUserData } from "@/lib/actions/user.action";
import { ProductFormData2 } from "@/lib/schemas/productSchema";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound, useParams } from "next/navigation";


  
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
    const { data: userData, isLoading:isLoadinguser} = useQuery({
      queryKey: ['userData'],
      queryFn: () => getUserData()
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
  return !isLoadinguser&&userData.role==="admin"?(
    <div className="">
        <ProductForm product={data}/>
    </div>
  ):notFound();
}
  export default ProductDetailPage;