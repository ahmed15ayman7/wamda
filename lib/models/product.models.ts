import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  barcode: string;
  itemName: string;
  unit: string;
  categoryName: string;
  category: string;
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

const ProductSchema: Schema = new Schema({
  barcode: { type: String, required: true,unique:true,index:true },
  itemName: { type: String, required: true,index:true },
  unit: { type: String, required: true,index:true },
  purchasePrice: { type: Number, required: true,index:true },
  unitCost: { type: Number, required: true,index:true },
  salePrice: { type: Number, required: true,index:true },
  wholesale1: { type: Number, required: true,index:true },
  wholesale2: { type: Number, required: true,index:true },
  exhibitSalePrice: { type: Number, required: true,index:true },
  websiteSalePrice: { type: Number, required: true,index:true },
  categoryName: { type: String, required: true,index:true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
    // required: true,
    ,
    index:true
  },
  unitName2: { type: String, required: true,index:true },
  productImage: { type: String },
  rating:{type:Number,default:4}
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
