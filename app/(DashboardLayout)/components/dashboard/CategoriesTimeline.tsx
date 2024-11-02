import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography, Link } from '@mui/material';
import { useTranslations } from 'next-intl';

// تحديث توقيع المكون
const CategoriesTimeline = ({ categories }: { categories: { _id: string; name: string; description: string; products: any[] }[] }) => {
  const t = useTranslations('categoriesTimeline'); // استخدم 'categoriesTimeline' كمفتاح الترجمة

  // إعداد الألوان والروابط للفئات
  const categoryDetails = categories.map(category => ({
    ...category,
    color: getRandomColor(), // اختيار لون عشوائي
    link: `/dashboard/utilities/categories/${category._id}`, // إنشاء رابط بناءً على الاسم
  }));

  return (
    <DashboardCard title={t('title')}>
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef'
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {categoryDetails.map((category, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              {t('product_count', { count: category.products.length })}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={"warning"} variant="outlined" />
              {index < categoryDetails.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">
                <Link href={category.link} className='text-[#12117e]' underline="none">
                  {category.name}
                </Link>
              </Typography>: {t('description')}: {category.description}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

// دالة لاختيار لون عشوائي من مجموعة محددة من الألوان
const getRandomColor = () => {
  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'default'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default CategoriesTimeline;
