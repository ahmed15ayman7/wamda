import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { IconCheck, IconDiscount, IconGlobe } from '@tabler/icons-react';

// تأثير Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// نموذج المنتج (ProductFormData) لتعريف الحقول المطلوبة
interface ProductFormData {
  wholesale1: number;
  wholesale2: number;
  exhibitSalePrice: number;
  websiteSalePrice: number;
}

const ProductPriceSelector = ({ prices }: { prices: ProductFormData }) => {
  // حالات لكل خيار checkbox
  const [wholesale1Checked, setWholesale1Checked] = useState(false);
  const [wholesale2Checked, setWholesale2Checked] = useState(false);
  const [exhibitSalePriceChecked, setExhibitSalePriceChecked] = useState(false);
  const [websiteSalePriceChecked, setWebsiteSalePriceChecked] = useState(false);

  // دالة لاختيار السعر بناءً على الخيارات المحددة
  const getPriceByRole = () => {
    if (wholesale1Checked) return prices.wholesale1;
    if (wholesale2Checked) return prices.wholesale2;
    if (exhibitSalePriceChecked) return prices.exhibitSalePrice;
    return prices.websiteSalePrice;
  };

  return (
    <motion.div initial="initial" animate="animate">
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Select Price Role:
        </Typography>
        
        <motion.div variants={fadeInUp}>
          <Grid container spacing={2}>
            {/* Checkbox لـ Wholesale 1 مع أيقونة */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={wholesale1Checked}
                    onChange={(e) => setWholesale1Checked(e.target.checked)}
                    color="primary"
                    icon={<IconDiscount />}
                    checkedIcon={<IconCheck />}
                  />
                }
                label="Wholesale 1"
              />
            </Grid>

            {/* Checkbox لـ Wholesale 2 مع أيقونة */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={wholesale2Checked}
                    onChange={(e) => setWholesale2Checked(e.target.checked)}
                    color="primary"
                    icon={<IconDiscount />}
                    checkedIcon={<IconCheck />}
                  />
                }
                label="Wholesale 2"
              />
            </Grid>

            {/* Checkbox لـ Exhibit Sale Price مع أيقونة */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exhibitSalePriceChecked}
                    onChange={(e) => setExhibitSalePriceChecked(e.target.checked)}
                    color="primary"
                    icon={<IconGlobe />}
                    checkedIcon={<IconCheck />}
                  />
                }
                label="Exhibit Sale Price"
              />
            </Grid>

            {/* Checkbox لـ Website Sale Price مع أيقونة */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={websiteSalePriceChecked}
                    onChange={(e) => setWebsiteSalePriceChecked(e.target.checked)}
                    color="primary"
                    icon={<IconGlobe />}
                    checkedIcon={<IconCheck />}
                  />
                }
                label="Website Sale Price"
              />
            </Grid>
          </Grid>
        </motion.div>

        {/* عرض السعر بناءً على الاختيار */}
        <motion.div variants={fadeInUp}>
          <Typography variant="h6" sx={{ marginTop: '2rem', fontWeight: 'bold' }}>
            Selected Price: {getPriceByRole()} $
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default ProductPriceSelector;
