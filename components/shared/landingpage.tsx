// components/LandingPage.tsx
"use client";
import React from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { ProductFormData } from "../forms/AddProduct";
import { Avatar, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import BlankCard from "@/app/(DashboardLayout)/components/shared/BlankCard";
import { useTranslations } from 'next-intl';

interface Permissions {
  wholesale1: boolean;
  wholesale2: boolean;
  exhibitSalePrice: boolean;
  websiteSalePrice: boolean;
  salePrice: boolean;
}

SwiperCore.use([Autoplay, Pagination, Navigation]);

const LandingPage = ({ products, type, permissions }: { products: ProductFormData[], type: string, permissions?: Permissions }) => {
  const t = useTranslations('landingPage'); // Use the translation function

  return (
    <div className="min-h-[70vh] bg-white text-gray-900">
      <section id="products" className="py-16 px-4">
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={20}
          className="pb-8"
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center space-y-4">
              <Grid item xs={12} md={4} lg={3} key={product.barcode}>
                <BlankCard>
                  <Tooltip title={t('clickToView')} arrow>
                    <Typography component={Link} href={`/products/${product._id}`}>
                      <Avatar
                        src={product.productImage || "/images/default-product.png"}  // Default image fallback
                        variant="square"
                        sx={{
                          height: 250,
                          width: '100%',
                        }}
                      />
                    </Typography>
                  </Tooltip>
                  <CardContent sx={{ p: 3, pt: 2 }}>
                    <Tooltip title={t('productName', { itemName: product.itemName })} arrow>
                      <Typography variant="h6">{product.itemName}</Typography>
                    </Tooltip>

                    <Tooltip title={t('category', { categoryName: product.categoryName })} arrow>
                      <Typography variant="body2" color="textSecondary">{t('category', { categoryName: product.categoryName })}</Typography>
                    </Tooltip>

                    <Tooltip title={t('unit', { unit: product.unit })} arrow>
                      <Typography variant="body2" color="textSecondary">{t('unit', { unit: product.unit })}</Typography>
                    </Tooltip>

                    <Stack direction="column" spacing={1} mt={2}>
                      {permissions && permissions.salePrice && (
                        <Tooltip title={t('salePrice', { salePrice: product.salePrice })} arrow>
                          <Typography variant="body2" color="textSecondary">{t('salePrice', { salePrice: product.salePrice })}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.wholesale1 && (
                        <Tooltip title={t('wholesale1', { wholesale1: product.wholesale1 })} arrow>
                          <Typography variant="body2" color="textSecondary">{t('wholesale1', { wholesale1: product.wholesale1 })}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.wholesale2 && (
                        <Tooltip title={t('wholesale2', { wholesale2: product.wholesale2 })} arrow>
                          <Typography variant="body2" color="textSecondary">{t('wholesale2', { wholesale2: product.wholesale2 })}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.exhibitSalePrice && (
                        <Tooltip title={t('exhibitSalePrice', { exhibitSalePrice: product.exhibitSalePrice })} arrow>
                          <Typography variant="body2" color="textSecondary">{t('exhibitSalePrice', { exhibitSalePrice: product.exhibitSalePrice })}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.websiteSalePrice && (
                        <Tooltip title={t('websiteSalePrice', { websiteSalePrice: product.websiteSalePrice })} arrow>
                          <Typography variant="body2" color="textSecondary">{t('websiteSalePrice', { websiteSalePrice: product.websiteSalePrice })}</Typography>
                        </Tooltip>
                      )}
                    </Stack>

                    {/* Rating */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                      <Rating name="read-only" size="small" value={product.rating} readOnly />
                    </Stack>
                  </CardContent>
                </BlankCard>
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default LandingPage;
