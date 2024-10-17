"use client";
import AdminsDashboard from '@/components/shared/admins';
import React from 'react';

import UserTable from '@/components/shared/UserTable';

const UsersPage = () => {
  return (
    <div>
     
      {/* AdminsDashboard component */}
      {/* <AdminsDashboard /> */}
      <UserTable/>
    </div>
  );
};

export default UsersPage;
