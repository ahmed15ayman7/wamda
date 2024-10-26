"use client";
import AdminsDashboard from '@/components/shared/admins';
import React from 'react';

import UserTable from '@/components/shared/UserTable';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/lib/actions/user.action';
import { notFound } from 'next/navigation';

const UsersPage = () => {
  const { data: userData, isLoading:isLoadinguser} = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData()
  });
  
  return !isLoadinguser&&userData.role==="admin" ?(
    <div>
     
      {/* AdminsDashboard component */}
      {/* <AdminsDashboard /> */}
      
      <UserTable/>
    </div>
  ):notFound();
};

export default UsersPage;
