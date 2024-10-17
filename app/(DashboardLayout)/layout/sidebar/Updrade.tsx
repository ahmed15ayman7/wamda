import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl'; // استيراد دالة الترجمة

export const Upgrade = () => {
    const  t  = useTranslations("Sidebar");

    return (
        <Box
            display='flex'
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
        >
            <Box>
                <Typography variant="h5" sx={{ width: "auto" }} fontSize='16px' mb={1}>
                    {t('addNewUser')} {/* نص مترجم */}
                </Typography>
                <Button
                    color="primary"
                    target="_blank"
                    disableElevation
                    component={Link}
                    href="/dashboard/utilities/users/add"
                    variant="contained"
                    aria-label="signup"
                    size="small"
                >
                    {t('signUp')} {/* نص مترجم */}
                </Button>
            </Box>
            <Box mt="-35px">
                <Image
                    alt="Rocket Image"
                    src='/images/backgrounds/rocket.png'
                    width={100}
                    height={100}
                />
            </Box>
        </Box>
    );
};
