import React, { ReactNode } from 'react';
import { IntlProvider } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { getLocal } from '@/hooks/locale';
const messages = {
    en: require('@/messages/en.json'),
    ar: require('@/messages/ar.json'),
  };
  interface LayoutProps {
    children: ReactNode;
  }
const LocaleProvider = ({ children }:LayoutProps) => {
    const { data: locale} = useQuery({
        queryKey: ['userData'],
        queryFn: () => getLocal()
      });
  return(
    //@ts-ignore
    <IntlProvider messages={messages[locale]} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
