import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'single product retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if (result._id.toString() === productId) {
      try {
        await result.deleteOne();
        res.status(200).json({
          success: true,
          message: 'Product deleted successfully',
          data: null,
        });
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || 'something went wrong',
          error: err,
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
