import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { IconUpload } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import axios from "axios";
import { toast } from "react-toastify";

const FileInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #555;
  width: 100%;
  max-width: 320px;
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
  transition: border-color 0.3s;
  &:focus {
    border-color: #29b6f6;
    outline: none;
  }
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

interface ProductFormData {
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  purchasePrice: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  productImage: string;
}

const Products= ({refetch}:{refetch:()=>void}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleToggleDialog = () => {
    setOpen(!open);
    setFile(null);
    console.log("Dialog toggled:", !open);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log("Selected file:", selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const sendProductToAPI = async (product: ProductFormData) => {
    console.log("Sending product to API:", product);
    const response = await axios.post("/api/products", product);
    console.log("API response:", response.data);
    return response.data;
  };

  const getImageBase64 = async (image: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        console.log("Image converted to Base64:", reader.result);
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("Error converting image to Base64:", error);
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    if (file) {
      console.log("Submitting file:", file);
      const loadingToastId = toast.loading("Uploading products...");
      setLoading(true);
  
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[] = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
        console.log("Excel data loaded:", jsonData);
  
        let successCount = 0;
        let errorCount = 0;
  
        // ابدأ من الصف الثاني (تجاهل الصف الأول)
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          console.log(`Processing row ${i}:`, row);
  
          if (row.length < 12 || row.some((cell: any) => cell === undefined || cell === "")) {
            console.warn(`Skipping row ${i}: invalid data`);
            if (row.length===0) {
            }else{
              errorCount++;

            }
            continue;
          }
  
          try {
            let productImageUrl = "";
  
            // تحقق من وجود العمود 13 (الصورة)
            if (row.length === 13 && row[12]) {
              const productImageBlob = row[12]; // العمود المخصص للصورة
              const base64Image = await getImageBase64(productImageBlob);
              productImageUrl = base64Image;
              console.log(`Product image for row ${i} converted to Base64`);
            }
  
            const formattedProduct: ProductFormData = {
              barcode: row[0]?.toString() || "",
              itemName: row[1]?.toString() || "",
              unit: row[2]?.toString() || "",
              categoryName: row[3]?.toString() || "",
              purchasePrice: Number(row[4]) || 0,
              salePrice: Number(row[5]) || 0,
              unitCost: Number(row[6]) || 0,
              wholesale1: Number(row[7]) || 0,
              wholesale2: Number(row[8]) || 0,
              unitName2: row[9]?.toString() || "",
              exhibitSalePrice: Number(row[10]) || 0,
              websiteSalePrice: Number(row[11]) || 0,
              productImage: productImageUrl, // إذا كانت الصورة موجودة، يتم تعيينها
            };
  
            console.log(`Formatted product for row ${i}:`, formattedProduct);
  
            await sendProductToAPI(formattedProduct);
            successCount++;
          } catch (error) {
            console.error(`Error processing row ${i}:`, error);
            errorCount++;
          }
        }
  
        setLoading(false);
        toast.dismiss(loadingToastId);
  
        console.log(`Upload completed: ${successCount} success, ${errorCount} errors`);
        if (successCount > 0 && errorCount === 0) {
          toast.success(`${successCount} products uploaded successfully!`);
          refetch()
        } else if (successCount > 0 && errorCount > 0) {
          toast.warn(`${successCount} products uploaded successfully, but ${errorCount} failed.`);
          refetch();
        } else {
          toast.error(`All products failed to upload.`);
        }
  
        handleToggleDialog();
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.warn("No file selected");
      toast.error("Please select a file before submitting.");
    }
  };
  

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleToggleDialog} startIcon={<IconUpload size={24} />}>
        Add Excel File
      </Button>

      <AnimatePresence>
        {open && (
          <Dialog open={open} onClose={handleToggleDialog} fullWidth maxWidth="sm">
            <DialogTitle>Upload Excel File</DialogTitle>

            <DialogContent>
              <StyledLabel htmlFor="file-upload">Choose a file to upload:</StyledLabel>

              <FileInput
                type="file"
                id="file-upload"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                title="Choose an Excel file to upload"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleToggleDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" disabled={loading}>
                Submit
              </Button>
            </DialogActions>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
