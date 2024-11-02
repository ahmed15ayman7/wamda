// app/components/ProductsTable.js
"use client";

import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Tooltip } from '@mui/material';

import { ProductFormData } from '../forms/AddProduct';

function ProductsTable({products,setCurrentPage,total}:{products:ProductFormData[],setCurrentPage:(num:number)=>void,total:number}) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


console.log(total)
  const handleChangePage = (_: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="text-gray-900 bg-white/10" style={{direction:"rtl"}}>
      <TableContainer className="mb-3 bg-white rounded-lg">
        <Table>
          <TableHead className="text-gray-900">
            <TableRow>
              <Tooltip title="اسم المنتج" arrow><TableCell align="right" className="text-gray-900 font-bold border-l-4 border-b-2  border-gray-900" >اسم المنتج</TableCell></Tooltip>
              <Tooltip title="سعر التجزئة" arrow><TableCell align="right" className="text-gray-900 font-bold border-l-4 border-b-2  border-gray-900">سعر التجزئة</TableCell></Tooltip>
              <Tooltip title="سعر الجملة 1" arrow><TableCell align="right" className="text-gray-900 font-bold border-l-4 border-b-2  border-gray-900">سعر الجملة 1</TableCell></Tooltip>
              <Tooltip title="سعر الجملة 2" arrow><TableCell align="right" className="text-gray-900 font-bold border-l-4 border-b-2  border-gray-900">سعر الجملة 2</TableCell></Tooltip>
              <Tooltip title="التكلفة" arrow><TableCell align="right" className="text-gray-900 font-bold  border-l-0 border-b-2  border-gray-900">التكلفة</TableCell></Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...products,...products,...products,...products,].map((product) => (
              <TableRow key={product._id}
              >
                <TableCell align="right" className="text-gray-900 border-l-4 border-b-0  border-gray-900">{product.itemName}</TableCell>
                <TableCell align="right" className="text-gray-900 border-l-4 border-b-0  border-gray-900">{product.exhibitSalePrice}</TableCell>
                <TableCell align="right" className="text-gray-900 border-l-4 border-b-0  border-gray-900">{product.wholesale1}</TableCell>
                <TableCell align="right" className="text-gray-900 border-l-4 border-b-0  border-gray-900">{product.wholesale2}</TableCell>
                <TableCell align="right" className="text-gray-900">{product.unitCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total * rowsPerPage}
        page={page}
        className="text-gray-900 bg-white rounded-lg"
        style={{direction:"ltr"}}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
}

export default ProductsTable;
