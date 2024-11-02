import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import {  IconMenu } from '@tabler/icons-react';

import useStore from '@/hooks/zustand';


interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {

  const { language, setLanguage, getLang } = useStore(); // Use Zustand store for language
  const [locale, setLocale] = useState<'en' | 'ar'>(language); // Track locale in state

  // Fetch the current language on component mount
  useEffect(() => {
    const currentLang = getLang();
    if (currentLang) {
      setLocale(currentLang as 'en' | 'ar');
    }
  }, [getLang]);

  // Handle language change
  const handleLanguageChange = (locale: 'en' | 'ar') => {
    const newLang = locale === 'en' ? 'ar' : 'en';
    setLanguage(newLang); // Update in Zustand store
    setLocale(newLang); // Update local state for instant feedback
  };

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" className=' bg-white/90' color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={() => handleLanguageChange(locale === 'en'?'en':"ar")} aria-label="English">
            {locale === 'en' ? (
              <img src="/images/en.svg" alt="English" width="24" height="24" />
            ) : (
              <img src="/images/ar.svg" alt="Arabic" width="24" height="24" />
            )}
          </IconButton>
        </Stack>

        <Box flexGrow={1} className={"flex justify-center  max-sm:hidden"} >
          <h1 className=" bg-gradient-to-b from-black from-50% via-white to-60% to-black font-bold text-[40px] max-sm:hidden  text-transparent bg-clip-text">خاص بمؤسسة ومضه الأناره التجاريه و فروعها</h1>
        </Box>
        <Stack spacing={1} direction="row" alignItems="center">
          <div className=" bg-gradient-to-b from-black via-white to-black rounded-sm">
          <Button variant="contained" component={Link} href="/authentication/login"   disableElevation className='w-full h-full bg-black/40 font-bold'
 >
            Login
          </Button>
    </div>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
