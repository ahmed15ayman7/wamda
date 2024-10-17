"use client"; // Ensure this component runs on the client side
import { useQuery } from '@tanstack/react-query';
import { Table, Button, notification } from 'antd';
import { FetchPendingUsers, UserApproved, UserDeleted } from '@/lib/actions/user.action';

interface User {
  _id: string;
  email: string;
  name: string;
}
const AdminsDashboard = () => {
  const { data: users, isLoading, error,refetch } = useQuery<User[]>({queryKey:['pendingUsers'],queryFn:()=> FetchPendingUsers()});

  const handleApprove = async (userId: string) => {
    try {
      await UserApproved(userId);
      refetch()
      notification.success({ message: 'User approved successfully!' });
    } catch (error:any) {
      notification.error({ message: error.message });
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await UserDeleted(userId);
      refetch()
      notification.success({ message: 'User deleted successfully!' });
    } catch (error:any) {
      notification.error({ message: error.message });
    }
  };
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      key: 'actions',
      render: (text: any, record: User) => (
        <span>
          <Button onClick={() => handleApprove(record._id)} className=' bg-primary-500 hover:bg-primary-500/90 text-white' style={{ marginRight: 8 }} >
            الموافقه
          </Button>
          <Button onClick={() => handleDelete(record._id)} className=' bg-red-600 hover:bg-red-700 text-white'>
            حذف نهائيا
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div >
      {/* <h1>Pending User Approvals</h1> */}
      <Table  dataSource={users} columns={columns} rowKey="_id" className={"text-white bg-white/10"} />
    </div>
  );
};

export default AdminsDashboard; 