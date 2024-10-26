import { Schema, model, models } from 'mongoose';

const unitsSchema = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

const Unit = models.Unit || model('Unit', unitsSchema);

export default Unit;
 