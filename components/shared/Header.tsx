
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconHome, IconShoppingCart, IconList, IconInfoCircle, IconMenu, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import Profile from '@/app/(DashboardLayout)/layout/header/Profile';
import { Button, IconButton, Stack } from '@mui/material';
import Link from 'next/link';
import useStore from '@/hooks/zustand';
import { useTranslations } from 'next-intl'; // Import useTranslation

const Header = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const toggleDrawer = (open:boolean) => () => {
    setDrawerOpen(open);
  };
  const { language, setLanguage, getLang } = useStore();
  const [locale, setLocale] = useState<'en' | 'ar'>(language);

  const t = useTranslations("header");
  useEffect(() => {
    const currentLang = getLang();
    if (currentLang) {
      setLocale(currentLang as 'en' | 'ar');
    }
  }, [getLang]);

  const handleLanguageChange = (locale: 'en' | 'ar') => {
    const newLang = locale === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    setLocale(newLang);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    toggleDrawer(false)();
  };

  const drawerItems = (
    <div className="flex flex-col p-4">
      <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/')}>
        <IconHome />
        <span>{t('home')}</span>
      </button>
      <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/products')}>
        <IconShoppingCart />
        <span>{t('products')}</span>
      </button>
      <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/categories')}>
        <IconList />
        <span>{t('categories')}</span>
      </button>
      <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/about')}>
        <IconInfoCircle />
        <span>{t('about')}</span>
      </button>
    </div>
  );

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <motion.div 
          className='flex items-center' 
          whileHover={{ scale: 1.1 }} 
          transition={{ duration: 0.3 }}
          style={{ cursor: 'pointer' }} 
          onClick={() => { handleNavigation('/'); }}
        >
          <Logo /> 
        </motion.div>

        {/* Drawer for mobile navigation */}
        {drawerOpen && (
          <div className="fixed inset-0 bg-white shadow-lg z-50 md:hidden">
            <div className="flex justify-between items-center p-4">
              <motion.div 
                className='flex items-center' 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }} 
                onClick={() => { handleNavigation('/'); }}
              >
                <Logo /> 
              </motion.div>
              <button onClick={toggleDrawer(false)} className="p-2 text-gray-600">
                <IconX />
              </button>
            </div>
            <div className="w-1/2 p-4">
              {drawerItems}
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="flex gap-2">
          <nav className="hidden md:flex space-x-4">
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/')}>
              <IconHome />
              <span>{t('home')}</span>
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/products')}>
              <IconShoppingCart />
              <span>{t('products')}</span>
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/categories')}>
              <IconList />
              <span>{t('categories')}</span>
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-600 hover:underline" onClick={() => handleNavigation('/about')}>
              <IconInfoCircle />
              <span>{t('about')}</span>
            </button>
          </nav>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => handleLanguageChange(locale === 'en' ? 'en' : 'ar')} aria-label="language">
              {locale === 'en' ? (
                <img src="/images/en.svg" alt="English" width="24" height="24" />
              ) : (
                <img src="/images/ar.svg" alt="Arabic" width="24" height="24" />
              )}
            </IconButton>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            {!isLogin && (
              <Button
                variant="contained"
                component={Link}
                href="/authentication/login"
                disableElevation
                color="primary"
              >
                {t('login')}
              </Button>
            )}
            <Profile setisLogin={setIsLogin} />
          </Stack>
          <button className="md:hidden p-2 text-gray-600" onClick={toggleDrawer(true)}>
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
