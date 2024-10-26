"use client"
import UnitForm from '@/components/forms/UnitForm'
import { getUserData } from '@/lib/actions/user.action';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import React from 'react'
const page = () => {
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  return !isLoadinguser&&userData.role==="admin"?(
    <div>
        <UnitForm/>
    </div>
  ):notFound()
}

export default page