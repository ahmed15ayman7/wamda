'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useQuery } from '@tanstack/react-query';

import ProductAnalysis from '@/app/(DashboardLayout)/components/dashboard/ProductAnalysis';
import CategoriesTimeline from '@/app/(DashboardLayout)/components/dashboard/CategoriesTimeline';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';

import { Spin } from 'antd';

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

  // Loading state
  if (isLoading) {
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

  return (
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
            <Blog products={data.products} role='admin' />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
