import React from 'react';
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Stack,
  Avatar
} from "@mui/material";

import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useTranslations } from 'next-intl';

export interface ProductFormData {
  _id: string;
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  category: string;
  purchasePrice: number;
  rating: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2?: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  productImage: string;
}
interface Permissions {
  wholesale1: boolean;
  wholesale2: boolean;
  exhibitSalePrice: boolean;
  websiteSalePrice: boolean;
  salePrice: boolean;
}

const Blog = ({ products, role, permissions }: { products: ProductFormData[], role: string, permissions?: Permissions }) => {
  const t = useTranslations('blog'); // استخدم مفتاح "blog" للوصول للنصوص المترجمة

  return (
    <Grid container spacing={3}>
      {products.map((product: ProductFormData) => (
        <Grid item xs={12} md={4} lg={3} key={product.barcode}>
          <BlankCard className='bg-black/20'>
            <Tooltip title={t('tooltip_product_details')} arrow>
              <Typography component={Link} href={`${role === "admin" ? '/dashboard/utilities' : ''}/products/${product._id}`}>
                <Avatar
                  src={product.productImage || "/images/default-product.png"}
                  variant="square"
                  sx={{
                    height: 250,
                    width: '100%',
                  }}
                />
              </Typography>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }} className='bg-black/20' >
              <Tooltip title={`${t('product_name')}: ${product.itemName}`} arrow>
                <Typography variant="h6">{product.itemName}</Typography>
              </Tooltip>

              <Tooltip title={`${t('category')}: ${product.categoryName}`} arrow>
                <Typography variant="body2" color="textSecondary">{`${t('category')}: ${product.categoryName}`}</Typography>
              </Tooltip>

              <Tooltip title={`${t('unit')}: ${product.unit}`} arrow>
                <Typography variant="body2" color="textSecondary">{`${t('unit')}: ${product.unit}`}</Typography>
              </Tooltip>

              <Stack direction="column" spacing={1} mt={2}>
                {role === 'admin' ? (
                  <>
                    <Tooltip title={`${t('sale_price')}: $${product.salePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">{`${t('sale_price')}: $${product.salePrice}`}</Typography>
                    </Tooltip>
                    <Tooltip title={`${t('wholesale_price_1')}: $${product.wholesale1}`} arrow>
                      <Typography variant="body2" color="textSecondary">{`${t('wholesale_price_1')}: $${product.wholesale1}`}</Typography>
                    </Tooltip>
                    <Tooltip title={`${t('wholesale_price_2')}: $${product.wholesale2}`} arrow>
                      <Typography variant="body2" color="textSecondary">{`${t('wholesale_price_2')}: $${product.wholesale2}`}</Typography>
                    </Tooltip>
                    <Tooltip title={`${t('exhibit_sale_price')}: $${product.exhibitSalePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">{`${t('exhibit_sale_price')}: $${product.exhibitSalePrice}`}</Typography>
                    </Tooltip>
                    <Tooltip title={`${t('website_sale_price')}: $${product.websiteSalePrice}`} arrow>
                      <Typography variant="body2" color="textSecondary">{`${t('website_sale_price')}: $${product.websiteSalePrice}`}</Typography>
                    </Tooltip>
                  </>
                ) : permissions && (
                  <>
                    {permissions.salePrice && (
                      <Tooltip title={`${t('sale_price')}: $${product.salePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">{`${t('sale_price')}: $${product.salePrice}`}</Typography>
                      </Tooltip>
                    )}
                    {permissions.wholesale1 && (
                      <Tooltip title={`${t('wholesale_price_1')}: $${product.wholesale1}`} arrow>
                        <Typography variant="body2" color="textSecondary">{`${t('wholesale_price_1')}: $${product.wholesale1}`}</Typography>
                      </Tooltip>
                    )}
                    {permissions.wholesale2 && (
                      <Tooltip title={`${t('wholesale_price_2')}: $${product.wholesale2}`} arrow>
                        <Typography variant="body2" color="textSecondary">{`${t('wholesale_price_2')}: $${product.wholesale2}`}</Typography>
                      </Tooltip>
                    )}
                    {permissions.exhibitSalePrice && (
                      <Tooltip title={`${t('exhibit_sale_price')}: $${product.exhibitSalePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">{`${t('exhibit_sale_price')}: $${product.exhibitSalePrice}`}</Typography>
                      </Tooltip>
                    )}
                    {permissions.websiteSalePrice && (
                      <Tooltip title={`${t('website_sale_price')}: $${product.websiteSalePrice}`} arrow>
                        <Typography variant="body2" color="textSecondary">{`${t('website_sale_price')}: $${product.websiteSalePrice}`}</Typography>
                      </Tooltip>
                    )}
                  </>
                )}
              </Stack>

              {/* <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Rating name="read-only" size="small" value={product.rating} readOnly />
              </Stack> */}
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;
