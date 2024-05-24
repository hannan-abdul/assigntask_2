import { z } from 'zod';

// Define Zod schema for inventory
const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity should contain only Numbers' })
    .int(),
  inStock: z.boolean().default(true),
});

// Define Zod schema for product variant
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define Zod schema for product
const productValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string()).min(1),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
