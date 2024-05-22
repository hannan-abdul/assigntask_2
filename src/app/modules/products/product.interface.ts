export type ProductInventory = {
  quantity: number;
  inStock: boolean;
};

export type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: {
    type: string;
    value: string;
  }[];
  inventory: ProductInventory;
};

// interface=> model/schema => validation => service => controller => route
