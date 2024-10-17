"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LocaleProvider from './LocaleProvider';
const InfintyProvider = ({children}:{children:React.ReactNode}) => {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
      {children}
      </LocaleProvider>
      </QueryClientProvider>
  )
}

export default InfintyProvider