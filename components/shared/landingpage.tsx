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

interface Permissions {
  wholesale1: boolean;
  wholesale2: boolean;
  exhibitSalePrice: boolean;
  websiteSalePrice: boolean;
  salePrice: boolean;
}

SwiperCore.use([Autoplay, Pagination, Navigation]);

const LandingPage = ({ products, type, permissions }: { products: ProductFormData[], type: string, permissions?: Permissions }) => {
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
                  <Tooltip title="Click to view product details" arrow>
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
                    <Tooltip title={`Product Name: ${product.itemName}`} arrow>
                      <Typography variant="h6">{product.itemName}</Typography>
                    </Tooltip>

                    <Tooltip title={`Category: ${product.categoryName}`} arrow>
                      <Typography variant="body2" color="textSecondary">Category: {product.categoryName}</Typography>
                    </Tooltip>

                    <Tooltip title={`Unit: ${product.unit}`} arrow>
                      <Typography variant="body2" color="textSecondary">Unit: {product.unit}</Typography>
                    </Tooltip>

                    <Stack direction="column" spacing={1} mt={2}>
                      {permissions && permissions.salePrice && (
                        <Tooltip title={`Sale Price: $${product.salePrice}`} arrow>
                          <Typography variant="body2" color="textSecondary">Sale Price: ${product.salePrice}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.wholesale1 && (
                        <Tooltip title={`Wholesale Price 1: $${product.wholesale1}`} arrow>
                          <Typography variant="body2" color="textSecondary">Wholesale 1: ${product.wholesale1}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.wholesale2 && (
                        <Tooltip title={`Wholesale Price 2: $${product.wholesale2}`} arrow>
                          <Typography variant="body2" color="textSecondary">Wholesale 2: ${product.wholesale2}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.exhibitSalePrice && (
                        <Tooltip title={`Exhibit Sale Price: $${product.exhibitSalePrice}`} arrow>
                          <Typography variant="body2" color="textSecondary">Exhibit Sale Price: ${product.exhibitSalePrice}</Typography>
                        </Tooltip>
                      )}
                      {permissions && permissions.websiteSalePrice && (
                        <Tooltip title={`Website Sale Price: $${product.websiteSalePrice}`} arrow>
                          <Typography variant="body2" color="textSecondary">Website Sale Price: ${product.websiteSalePrice}</Typography>
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
