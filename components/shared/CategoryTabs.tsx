import React from 'react';
import { Tabs, Tab, Box, Badge, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IconList } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { ProductFormData } from '../forms/AddProduct';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import { Spin } from 'antd';
import { useTranslations } from 'next-intl';

interface CategoryProps {
  name: string;
  _id: string;
  products: ProductFormData[];
}

interface Permissions {
  wholesale1: boolean;
  wholesale2: boolean;
  exhibitSalePrice: boolean;
  websiteSalePrice: boolean;
  salePrice: boolean;
}

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
  const t = useTranslations();

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
      {/* Box with Flexbox to align Tabs and Select side by side */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Tabs for first 4 categories */}
        <Tabs
          value={selectedCategory}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="category tabs"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#7EBE4B', // Green indicator color
            },
            '.MuiTab-root': {
              color: '#12127F', // Blue text color
              '&.Mui-selected': {
                color: '#7EBE4B', // Green text color when selected
              },
            },
          }}
        >
          <Tab
            label={
              <div className='flex gap-5'>
                <p>{t('categoryTabs.all')}</p>
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
                    color="success"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  ></Badge>
                  <p>{category.name}</p>
                </div>
              }
              value={category._id}
              iconPosition="start"
            />
          ))}
        </Tabs>

        {/* Select dropdown for remaining categories */}
        {remainingCategories.length > 0 && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label">{t('categoryTabs.moreCategories')}</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              onChange={handleSelectChange}
              label={t('categoryTabs.moreCategories')}
              sx={{
                '.MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#7EBE4B', // Green border
                  },
                  '&:hover fieldset': {
                    borderColor: '#7EBE4B', // Green border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7EBE4B', // Green border when focused
                  },
                },
                '.MuiSelect-icon': {
                  color: '#12127F', // Blue select arrow
                },
              }}
            >
              {remainingCategories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  <div className='flex gap-5'>

                  <Badge
                    badgeContent={category.products.length}
                    color="success"
                    overlap="circular"
                    anchorOrigin={{
                      
                      horizontal: 'left',
                    }}
                    >
                    </Badge>
                    {category.name} 
                    </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

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
              <Box>{t('categoryTabs.noProducts')}</Box>
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
