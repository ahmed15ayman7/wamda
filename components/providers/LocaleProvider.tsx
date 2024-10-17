import React, { ReactNode } from 'react';
import { IntlProvider } from 'next-intl';
import useStore from '@/hooks/zustand';
const messages = {
    en: require('@/messages/en.json'),
    ar: require('@/messages/ar.json'),
  };
  interface LayoutProps {
    children: ReactNode;
  }
const LocaleProvider = ({ children }:LayoutProps) => {
  const { language, getLang } = useStore();
  let locale=getLang()||language
  return(
    //@ts-ignore
    <IntlProvider messages={messages[locale]} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
