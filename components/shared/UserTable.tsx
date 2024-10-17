'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Container,
  Box,
  Checkbox,
  FormGroup,
  FormLabel,
  Button,
  Pagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Drawer,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Alert, Spin } from 'antd';
import Link from 'next/link';
import { IconUserPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '@/lib/schemas/userSchema'; 
const fetchUsers = async (page: number, limit: number, search: string, role: string) => {
  try {
    const { data } = await axios.get(`/api/users?page=${page}&limit=${limit}&search=${search ? search : ""}&role=${role ? role : ""}`);
    return data;
  } catch (e: any) {
    console.error('Error fetching users:', e);
    return null;
  }
};

// API function to delete user
const deleteUser = async (userId: string) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10); // Default limit to 10
  const [role, setRole] = useState(''); // New role filter
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [selectedUser, setSelectedUser] = useState(null); // User to edit
  const router = useRouter();

  // Fetching users with useQuery
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ['users', currentPage, limit, searchQuery, role],
    queryFn: () => fetchUsers(currentPage, limit, searchQuery, role),
  });

  // Handle user deletion
  const handleDelete = (userId: string) => {
    deleteUser(userId); // Perform the delete operation
  };

  // Handle user update
  const handleUpdate = (user: any) => {
    setSelectedUser(user);
    setDrawerOpen(true); // Open the drawer
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle limit change
  const handleLimitChange = (event: any) => {
    setLimit(event.target.value as number);
  };

  // Handle role change
  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  // Close the drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUser(null); // Reset selected user
  };

  if (isError) {
    return <Alert type='error' description={"Error fetching users"} />
  }

  return (
    <Container component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Box sx={{ mt: 4 }}>
        <h2>User List</h2>

        {/* Search input */}
        <div className="w-full flex justify-between">
          <div className="flex ">
            <TextField
              label="Search Users"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
            />

            {/* Limit Selector */}
            <FormControl sx={{ mb: 2, ml: 2 }}>
              <InputLabel id="limit-select-label">Limit</InputLabel>
              <Select
                labelId="limit-select-label"
                value={limit}
                onChange={handleLimitChange}
                label="Limit"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {/* Role Selector */}
            <FormControl sx={{ mb: 2, ml: 2 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={role}
                className='w-[150px]'
                onChange={handleRoleChange}
                label="Role"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="wholesale1">Wholesale 1</MenuItem>
                <MenuItem value="wholesale2">Wholesale 2</MenuItem>
                <MenuItem value="retail">Retail</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
            <Tooltip title="Add a new user" arrow>
              <Link href="/dashboard/utilities/users/add" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<IconUserPlus />}
                >
                  Add User
                </Button>
              </Link>
            </Tooltip>
          </Box>
        </div>
        {isLoading && <Spin />}
        {/* User Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading && data.users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Tooltip title="Edit user" arrow>
                    <IconButton onClick={() => handleUpdate(user)} color="primary">
                      <IconEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user" arrow>
                    <IconButton onClick={() => handleDelete(user._id)} color="secondary">
                      <IconTrash />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {!isLoading && <Pagination
          count={data.totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 2 }}
        />}
      </Box>

      {/* Drawer for editing user */}
      <Drawer anchor="bottom" open={drawerOpen} onClose={handleCloseDrawer}>
        <div className='flex justify-center'>

        <UpdateUserForm user={selectedUser} onClose={handleCloseDrawer} refetch={refetch} />
        </div>
      </Drawer>
    </Container>
  );
};

const UpdateUserForm: React.FC<{ user: any; onClose: () => void; refetch: () => void }> = ({
  user,
  onClose,
  refetch,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || {
      name: '',
      email: '',
      password: '',
      role: '',
      permissions: {
        wholesale1: false,
        wholesale2: false,
        exhibitSalePrice: false,
        websiteSalePrice: false,
        salePrice: false,
      },
    }, // Set default values
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await axios.put(`/api/users/${user._id}`, data);
      if (result?.data.success) {
        refetch();
        toast.success(result.data.message); // Show success message
        reset(); // Reset form after submission
        onClose(); // Close the drawer
      } else {
        toast.error(result?.data.message || 'Failed to edit user.'); // Show error message
      }
    } catch (error) {
      toast.error('An error occurred while editing user.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
        p: 3,
        boxShadow: 3,
      }}
    >
      <h2>Edit User</h2>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select {...field} label="Role" error={!!errors.role}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
            {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
          </FormControl>
        )}
      />

      {/* Permissions Section */}
      <FormGroup>
        <FormLabel component="legend">Permissions</FormLabel>
        <FormControl error={!!errors.permissions}>
          <FormGroup>
            <Controller
              name="permissions.wholesale1"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Wholesale 1"
                />
              )}
            />
            <Controller
              name="permissions.wholesale2"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Wholesale 2"
                />
              )}
            />
            <Controller
              name="permissions.exhibitSalePrice"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Exhibit Sale Price"
                />
              )}
            />
            <Controller
              name="permissions.websiteSalePrice"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Website Sale Price"
                />
              )}
            />
            <Controller
              name="permissions.salePrice"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Sale Price"
                />
              )}
            />
          </FormGroup>
          {errors.permissions && <FormHelperText>{errors.permissions.message}</FormHelperText>}
        </FormControl>
      </FormGroup>

      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
      <Button onClick={onClose} variant="outlined" color="secondary">
        Cancel
      </Button>
    </Box>
  );
};


export default UserTable;
