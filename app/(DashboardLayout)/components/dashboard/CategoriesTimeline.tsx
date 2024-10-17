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

// تحديث توقيع المكون
const CategoriesTimeline = ({ categories }: { categories: { _id:string,name: string; description: string; products: any[] }[] }) => {
  // إعداد الألوان والروابط للفئات
  const categoryDetails = categories.map(category => ({
    ...category,
    color: getRandomColor(), // اختيار لون عشوائي
    link: `/dashboard/utilities/categories/${category._id}`, // إنشاء رابط بناءً على الاسم
  }));

  return (
    <DashboardCard title="Categories Overview">
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
            <TimelineOppositeContent>{category.products.length} product</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={category.color as ("primary" | "secondary" | "success" | "warning" | "error" | "inherit" | "grey" | "info")} variant="outlined" />
              {index < categoryDetails.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">
                <Link href={category.link} underline="none">
                  {category.name}
                </Link>
              </Typography>: {category.description}
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
