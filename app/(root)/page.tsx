import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/authentication/login');
}
// "use client";
// import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import LandingPage from '../../components/shared/landingpage';
// import { getUserData } from '@/lib/actions/user.action';
// import { Spin } from 'antd';
// import CategoryTabs from '@/components/shared/CategoryTabs';
// import { Box, Pagination } from '@mui/material';

// const fetchProducts = async (category: string | null, page: number) => {
//   const params = new URLSearchParams();
//   params.append('pageSize', "8");
//   params.append('page', page.toString()); // Add current page

//   if (category) {
//     params.append('category', category);
//   }

//   const response = await fetch(`/api/products?${params.toString()}`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };
// const fetchProducts2 = async () => {
//   const params = new URLSearchParams();
//   params.append('pageSize', "8");


//   const response = await fetch(`/api/products?${params.toString()}`);
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// // Function to fetch categories
// const fetchCategories = async () => {
//   const response = await fetch('/api/categories');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const Page = () => {
//   const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useQuery({
//     queryKey: ['categories'],
//     queryFn: () => fetchCategories()
//   });

//   const { data: userData, isLoading} = useQuery({
//     queryKey: ['userData'],
//     queryFn: () => getUserData()
//   });

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data: products, error: productsError, isLoading: productsLoading } = useQuery({
//     queryKey: ['products', selectedCategory, currentPage],
//     queryFn: () => fetchProducts(selectedCategory || null, currentPage), 
//     enabled: !!categories,
//   });
//   const { data: products2, error: productsError2, isLoading: productsLoading2 } = useQuery({
//     queryKey: ['products2'],
//     queryFn: () => fetchProducts2(), 
//   });

//   if ( categoriesLoading ) return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
//       <Spin size="large" />
//     </div>
//   );

//   if (productsError2 ) return <div>Error fetching products: {productsError2.message}</div>;
//   if (productsError ) return <div>Error fetching products: {productsError.message}</div>;
//   if (categoriesError) return <div>Error fetching categories: {categoriesError.message}</div>;


//   return (
//     <div>
//       {!productsLoading2&&!isLoading ?<LandingPage products={products2.products} type={userData?userData.role:"user"} permissions={userData?userData.permissions:undefined}/>:
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//       <Spin size="large" />
//     </div>}
//      {!isLoading&& <CategoryTabs 

//         selectedCategory={selectedCategory} 
//         setSelectedCategory={setSelectedCategory} 
//         products={!productsLoading?products.products:[]} 
//         categories={categories} 
//         productsLoading={productsLoading}
//         role={userData?userData.role:"user"} 
//         permissions={userData?userData.permissions:undefined}
        
//       />
//       }
//       {/* Pagination Controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//         <Pagination
//           count={Math.ceil(products?.total / 8)} // Assuming you have total products count from API
//           page={currentPage}
//           onChange={(event, value) => setCurrentPage(value)}
//           color="primary"
//           variant="outlined"
//           shape="rounded"
//         />
//       </Box>
//     </div>
//   );
// };

// export default Page;
