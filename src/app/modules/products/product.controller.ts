import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { date } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const zodParseData = productValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.merrage || 'Something went wrong',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      date: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.merrage || 'Something went wrong',
      err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
