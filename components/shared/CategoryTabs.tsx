import React, { useState } from 'react';
import { Tabs, Tab, Box, Badge, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconList } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { ProductFormData } from '../forms/AddProduct';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Spin } from 'antd';
import { useTranslations } from 'next-intl'; // استيراد useTranslation

interface CategoryProps {
  name: string;
  products: ProductFormData[];
}

interface Permissions {
  wholesale1: boolean;
  wholesale2: boolean;
  exhibitSalePrice: boolean;
  websiteSalePrice: boolean;
  salePrice: boolean;
};

const CategoryTabs = ({
  productsLoading,
  role,
  categories,
  setSelectedCategory,
  selectedCategory,
  products,
  permissions
}: {
  productsLoading: boolean;
  role: string;
  products: ProductFormData[];
  selectedCategory: string;
  categories: CategoryProps[];
  setSelectedCategory: (i: string) => void;
  permissions?: Permissions
}) => {
  const  t  = useTranslations(); // استخدام useTranslation

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  // Handle select change
  const handleSelectChange = (event: any) => {
    setSelectedCategory(event.target.value as string);
  };

  // Get first 4 categories for Tabs
  const firstFourCategories = categories.slice(0, 4);

  // Get the remaining categories for the Select dropdown
  const remainingCategories = categories.slice(4);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs for first 4 categories */}
      <Tabs
        value={selectedCategory}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="category tabs"
      >
        <Tab
          label={
            <div className='flex gap-5'>
              <p>{t('categoryTabs.all')}</p> {/* استخدام النص من ملف اللغة */}
            </div>
          }
          value={""}
          icon={<IconList size={20} />}
          iconPosition="start"
        />
        {firstFourCategories.map((category) => (
          <Tab
            key={category.name}
            label={
              <div className='flex gap-5'>
                <Badge
                  badgeContent={category.products.length}
                  color="primary"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                </Badge>
                <p>{category.name}</p>
              </div>
            }
            value={category.name}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {/* Select dropdown for remaining categories */}
      {remainingCategories.length > 0 && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="category-select-label">{t('categoryTabs.moreCategories')}</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            onChange={handleSelectChange}
            label={t('categoryTabs.moreCategories')}
          >
            {remainingCategories.map((category) => (
              <MenuItem key={category.name} value={category.name}>
                {category.name} ({category.products.length})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Product List */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {!productsLoading ? (
          <Box>
            {products && products.length > 0 ? (
              <Blog products={products} role={role} permissions={permissions} />
            ) : (
              <Box>{t('categoryTabs.noProducts')}</Box> // استخدام النص من ملف اللغة
            )}
          </Box>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" />
          </div>
        )}
      </motion.div>
    </Box>
  );
};

export default CategoryTabs;
