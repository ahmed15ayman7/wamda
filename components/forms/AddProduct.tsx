"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData2, productSchema } from "@/lib/schemas/productSchema";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../cards/Modal";
import axios from "axios";
import PencilIcon from "../cards/PencilIcon";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { unitNames } from "@/constants/data";

export interface ProductFormData {
  _id: string;
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  category: string;
  purchasePrice: number;
  rating: number;
  salePrice: number;
  unitCost: number;
  wholesale1: number;
  wholesale2: number;
  unitName2?: string;
  exhibitSalePrice: number;
  websiteSalePrice: number;
  productImage: string;
}

const fetchCategories = async () => {
  const response = await axios.get("/api/categories");
  return response.data;
};

interface ProductFormProps {
  product?: ProductFormData2; // Optional product prop for editing
  // onSubmit: (data: ProductFormData2) => Promise<void>; // Submit handler
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const t = useTranslations('ProductForm');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  let router=useRouter()
  const { control, handleSubmit,watch, formState: { errors }, setValue, reset } = useForm<ProductFormData2>({
    resolver: zodResolver(productSchema),
  });

  const avatarUrl = useRef("");

  // Fetch categories using useQuery
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  // Update form with existing product data if in edit mode
  useEffect(() => {
    if (product) {
      reset(product); // Populate form with product data
      setProductImagePreview(product.productImage); // Set image preview if editing
    }
  }, [product, reset]);

  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
    setProductImagePreview(imgSrc);
    setValue("productImage", imgSrc);
  };
  const handleFormSubmit = async (data: ProductFormData2) => {
    const toastId = toast.loading("Saving product..."); // Start loading toast
    try {
      if (product) {
        // Update product if editing
        await axios.put(`/api/products/${product._id}`, data);
        toast.update(toastId, {
          render: "Product updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.back();
      } else {
        await axios.post('/api/products', data);
        toast.update(toastId, {
          render: "Product added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        reset();
        router.refresh(); // Reload the page after adding a product
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to save product. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  

  const selectedUnit = watch("unit");

  // احصل على الاختصار للوحدة المختارة
  const selectedUnitData = unitNames.find(unit => unit.name === selectedUnit);
  const abbreviation = selectedUnitData ? selectedUnitData.abbreviation : "";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{product ? t('editProduct') : t('addNewProduct')}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          {/* Barcode */}
          <div>
            <label className="block text-sm font-medium">{t('barcode')}</label>
            <Controller
              name="barcode"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('barcode')}
                />
              )}
            />
            {errors.barcode && <span className="text-red-500">{errors.barcode.message}</span>}
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium">{t('itemName')}</label>
            <Controller
              name="itemName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('itemName')}
                />
              )}
            />
            {errors.itemName && <span className="text-red-500">{errors.itemName.message}</span>}
          </div>

          {/* Unit Select */}
      <div>
        <label className="block text-sm font-medium">{t('unit')}</label>
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="border border-gray-300 rounded-md p-2 w-full"
              // placeholder={t('unit')}
              
            >
              <option value="" disabled>{t('unit')}</option>
              {unitNames.map((unit, index) => (
                <option key={index} value={unit.name}>
                  {unit.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.unit && <span className="text-red-500">{errors.unit.message}</span>}
      </div>

      {/* Unit Name 2 */}
      <div>
        <label className="block text-sm font-medium">{t('unitName2')}</label>
        <Controller
          name="unitName2"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={abbreviation} // ضبط قيمة الاختصار هنا
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder={t('unitName2')}
              readOnly // جعل الحقل للقراءة فقط
            />
          )}
        />
        {errors.unitName2 && <span className="text-red-500">{errors.unitName2.message}</span>}
      </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">{t('category')}</label>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <select
                  onChange={(e) => {
                    const selectedCategoryId = e.target.value;
                    const selectedCategory = categories?.find((cat: { _id: string; }) => cat._id === selectedCategoryId);

                    onChange(selectedCategoryId); // Store the category ID
                    setValue("categoryName", selectedCategory ? selectedCategory.name : ""); // Store the category name
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                  className="border border-gray-300 rounded-md p-2 w-full"
                >
                  <option value="">{t('category')}</option>
                  {isLoading ? (
                    <option value="">{t('loadingCategories')}</option>
                  ) : (
                    categories?.map((category: { _id:  string ; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              )}
            />
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
          </div>

          {/* Pricing Fields */}
          <div>
            <label className="block text-sm font-medium">{t('purchasePrice')}</label>
            <Controller
              name="purchasePrice"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('purchasePrice')}
                />
              )}
            />
            {errors.purchasePrice && <span className="text-red-500">{errors.purchasePrice.message}</span>}
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium">{t('salePrice')}</label>
            <Controller
              name="salePrice"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('salePrice')}
                />
              )}
            />
            {errors.salePrice && <span className="text-red-500">{errors.salePrice.message}</span>}
          </div>

          {/* Unit Cost */}
          <div>
            <label className="block text-sm font-medium">{t('unitCost')}</label>
            <Controller
              name="unitCost"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('unitCost')}
                />
              )}
            />
            {errors.unitCost && <span className="text-red-500">{errors.unitCost.message}</span>}
          </div>

          {/* Wholesale1 Price */}
          <div>
            <label className="block text-sm font-medium">{t('wholesale1')}</label>
            <Controller
              name="wholesale1"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('wholesale1')}
                />
              )}
            />
            {errors.wholesale1 && <span className="text-red-500">{errors.wholesale1.message}</span>}
          </div>

          {/* Wholesale2 Price */}
          <div>
            <label className="block text-sm font-medium">{t('wholesale2')}</label>
            <Controller
              name="wholesale2"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('wholesale2')}
                />
              )}
            />
            {errors.wholesale2 && <span className="text-red-500">{errors.wholesale2.message}</span>}
          </div>

          {/* Exhibit Sale Price */}
          <div>
            <label className="block text-sm font-medium">{t('exhibitSalePrice')}</label>
            <Controller
              name="exhibitSalePrice"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('exhibitSalePrice')}
                />
              )}
            />
            {errors.exhibitSalePrice && <span className="text-red-500">{errors.exhibitSalePrice.message}</span>}
          </div>

          {/* Website Sale Price */}
          <div>
            <label className="block text-sm font-medium">{t('websiteSalePrice')}</label>
            <Controller
              name="websiteSalePrice"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('websiteSalePrice')}
                />
              )}
            />
            {errors.websiteSalePrice && <span className="text-red-500">{errors.websiteSalePrice.message}</span>}
          </div>

          {/* Rating */}
          {/* <div>
            <label className="block text-sm font-medium">{t('rating')}</label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  placeholder={t('rating')}
                />
              )}
            />
            {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
          </div> */}
        </div>
          {/* Product Image Upload */}
          <div>
          <label className="block text-sm font-medium">{t('productImage')}</label>
  <div className="mb-4 relative">

  <button
    className="flex items-center gap-3 -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full border  bg-[#5D87FF] text-white px-5 hover:bg-[#5D87FF90] transition"
    title="Change photo"
    onClick={(e) => {
      e.preventDefault();
      setIsDialogOpen(true);
    }}>
    {t('changeImage')} <PencilIcon />
  </button>
</div>
  <Controller
    name="productImage"
    control={control}
    render={({ field }) => (
      <>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-[10000]">
          <div className="fixed inset-0  bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg">
              <Modal updateAvatar={(imgSrc) => {
                field.onChange(imgSrc);
                updateAvatar(imgSrc);
                setIsDialogOpen(false);
              }} closeModal={() => setIsDialogOpen(false)} />
            </Dialog.Panel>
          </div>
        </Dialog>

        {productImagePreview && (
          <div className="mt-4">
            <Image
              src={productImagePreview}
              alt="Product Preview"
              width={100}
              height={100}
              className="rounded"
              />
          </div>
        )}
      </>
    )}
    />
</div>
        

       

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2"
        >
          {product ? t('updateButton') : t('submitButton')}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;


 