import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const zodParseData = orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    let result;
    if (email) {
      result = await OrderServices.getOrdersByEmailFromDB(email as string);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Orders not found for the provided email',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      result = await OrderServices.getAllOrdersFromDB(); // Get all orders if no email is provided
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
