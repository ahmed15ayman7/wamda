'use client'
import { Grid, Box, Typography, Tooltip, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useQuery } from '@tanstack/react-query';

import ProductAnalysis from '@/app/(DashboardLayout)/components/dashboard/ProductAnalysis';
import CategoriesTimeline from '@/app/(DashboardLayout)/components/dashboard/CategoriesTimeline';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';

import { Spin } from 'antd';
import { getUserData } from '@/lib/actions/user.action';
import ProductsPage from './utilities/products/page';
import Products from '@/components/shared/Products';
import  Link  from 'next/link';
import { IconLayoutGridAdd, IconPlus } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// Fetch function to get data
const fetchDashboardData = async () => {
  const response = await fetch('/api/dashboard'); // Adjust the API endpoint as needed
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  // Loading state
  const t = useTranslations('ProductsPage'); 
  if (isLoading || isLoadinguser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <PageContainer title="Dashboard" description="this is Dashboard">
        <Typography variant="h6" color="error">
          An error occurred: {error.message}
        </Typography>
      </PageContainer>
    );
  }

  return userData.role==="admin" ?
  (<div>

              <div className="flex justify-between items-center max-sm:w-full gap-3  mb-2">
              <Tooltip title={t('addUnit')} arrow>
            <Link href="/dashboard/utilities/units/add" passHref>
              <Button
                variant="contained"
                className='bg-[#7ebe4b] hover:bg-[#7ebe4b90]'
                startIcon={<IconPlus />}
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                >
                {t('addUnit')} {/* Use translation for the button */}
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title={t('addCategory')} arrow>
            <Link href="/dashboard/utilities/categories/add" passHref>
              <Button
                variant="contained"
                startIcon={<IconPlus />}
                className='flex gap-4 bg-[#7ebe4b] hover:bg-[#7ebe4b90]'
                
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                >
                {t('addCategory')}
              </Button>
            </Link>
          </Tooltip>

          <Products refetch={()=>{}} />
          <Tooltip title="Add a new product" arrow>
            <Link href="/dashboard/utilities/products/add" passHref>
              <Button variant="contained" 
                className='flex gap-4 bg-[#7ebe4b] hover:bg-[#7ebe4b90]'
             startIcon={<IconLayoutGridAdd />}>
                {t('addProduct')}
              </Button>
            </Link>
          </Tooltip>
        </div>
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} lg={8}>
            <Products />
          </Grid> */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProductAnalysis 
                  numberOfProducts={data?.numberOfProducts} 
                  numberOfCategories={data?.numberOfCategories} 
                  numberOfUsers={data?.numberOfUsers} 
                  />
              </Grid>
              {/* <Grid item xs={12}>
          <MonthlyEarnings /> 
        </Grid> */}
           
          <Grid item xs={12} >
            <CategoriesTimeline categories={data.categories} />
          </Grid>
           </Grid>
          </Grid> 
          <Grid item xs={12} lg={8}>
            {/* Pass the user data to ProductPerformance */}
            <ProductPerformance userData={data?.users} />
          </Grid>

          <Grid item xs={12}>
            <Blog products={data.products} role={userData.role} permissions={userData.permissions} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
        </div>
  ):<ProductsPage/>;
};

export default Dashboard;
