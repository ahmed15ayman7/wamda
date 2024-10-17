import React from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { IUser } from '@/lib/models/user.models'; // Ensure the path is correct
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

interface ProductPerformanceProps {
    userData: {  name: string;
        _id: string;
        email: string;
        password: string;
        createdAt: Date;
        isApproved: boolean;
        role: 'admin' | 'wholesale1' | 'wholesale2' | 'retail';}[]; // Specify that userData is an array of IUser
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ userData }) => {
    const router = useRouter();

    return (
        <DashboardCard title="Users Performance">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email
                                </Typography>
                            </TableCell>
                            {/* <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData.slice(0, 4).map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                        {product._id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                                                {product.role}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.email}
                                    </Typography>
                                </TableCell>
                                {/* <TableCell>
                                    <Chip
                                        sx={{ px: "4px", backgroundColor: "primary.main", color: "#fff" }}
                                        size="small"
                                        label="Low" // Adjust dynamically as needed
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">$0.00</Typography> 
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={() => router.push('/dashboard/utilities/users')}
                >
                    Show More
                </Button>
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
