"use client"
import ProductForm from '@/components/forms/AddProduct'
import { getUserData } from '@/lib/actions/user.action';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react'

const page = () => {
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  return (
    <div>
        <ProductForm/>
    </div>
  )
}

export default page