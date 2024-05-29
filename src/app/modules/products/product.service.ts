import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};
const deleteProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateProductFromDB = async (id: string, product: Partial<Product>) => {
  const result = await ProductModel.findByIdAndUpdate({ _id: id }, product, {
    new: true,
  });
  return result;
};

const searchProductsInDB = async (query: string) => {
  const regex = new RegExp(query, 'i');
  const result = await ProductModel.find({
    $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductFromDB,
  searchProductsInDB,
};
