import { Schema, model } from 'mongoose';
import { Product, ProductInventory } from './product.interface';

const inventorySchema = new Schema<ProductInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  category: { type: String, required: [true, 'category is required'] },
  tags: { type: [String], required: [true, 'tags is required'] },
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  inventory: { type: inventorySchema, required: true },
});

export const ProductModel = model<Product>('Student', productSchema);
