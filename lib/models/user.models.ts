import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  isApproved: boolean;
  role: 'admin' | 'user'; // تقليص الأدوار إلى 'admin' و 'user' فقط
  permissions: {
    wholesale1: boolean;
    wholesale2: boolean;
    exhibitSalePrice: boolean;
    websiteSalePrice: boolean;
    salePrice: boolean;
  };
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: true, // بشكل افتراضي، الحسابات معتمدة
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // تحديد الأدوار المتاحة إلى 'admin' و 'user' فقط
    default: 'user', // القيمة الافتراضية هي 'user'
    required: true,
  },
  permissions: {
    wholesale1: { type: Boolean, default: false }, // صلاحية 'wholesale1'
    wholesale2: { type: Boolean, default: false }, // صلاحية 'wholesale2'
    exhibitSalePrice: { type: Boolean, default: false }, // صلاحية 'exhibitSalePrice'
    websiteSalePrice: { type: Boolean, default: false }, // صلاحية 'websiteSalePrice'
    salePrice: { type: Boolean, default: false }, // صلاحية 'salePrice'
  },
});

// إنشاء وتصدير نموذج المستخدم
const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);
export default User;
