import { Schema, model, models } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
    },
  ],
}, { timestamps: true });

const Category = models.Category || model('Category', categorySchema);

export default Category;
