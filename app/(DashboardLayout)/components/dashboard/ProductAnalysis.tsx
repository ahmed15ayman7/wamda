import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useTranslations } from 'next-intl';

interface ProductAnalysisProps {
  numberOfProducts: number;
  numberOfCategories: number;
  numberOfUsers: number;
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({
  numberOfProducts,
  numberOfCategories,
  numberOfUsers,
}) => {
  const t = useTranslations('productAnalysis'); // استخدام 'productAnalysis' للحصول على الترجمة
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // Chart configuration
  const optionsColumnChart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: ["#7ebe4b", "#12117e", '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: 'dark' ,
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: [t("products"),t("categories"),t("users")],
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  // Sample series data for the chart
  const seriesColumnChart: any = [
    (numberOfProducts / (numberOfProducts + numberOfCategories + numberOfUsers)) * 100,
    (numberOfCategories / (numberOfProducts + numberOfCategories + numberOfUsers)) * 100,
    (numberOfUsers / (numberOfProducts + numberOfCategories + numberOfUsers)) * 100,
  ];

  return (
    <DashboardCard title={t('title')}>
      <Grid container spacing={3}>
        {/* Column for product and category counts */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h4" fontWeight="700">
            {t('summary')}
          </Typography>
          <Stack spacing={2} mt={2}>
            <Typography variant="subtitle1" fontWeight="600">
              {t('products')}: {numberOfProducts}
            </Typography>
            <Typography variant="subtitle1" fontWeight="600">
              {t('categories')}: {numberOfCategories}
            </Typography>
            <Typography variant="subtitle1" fontWeight="600">
              {t('users')}: {numberOfUsers}
            </Typography>
          </Stack>
        </Grid>
        {/* Column for chart */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionsColumnChart}
            series={seriesColumnChart}
            type="donut"
            height={150}
            width={"100%"}
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default ProductAnalysis;
