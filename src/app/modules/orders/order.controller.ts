import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseData = orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
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
      if (!result || result.length === 0) {
        throw new Error('Orders not found for the provided email');
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email',
        data: result,
      });
    } else {
      result = await OrderServices.getAllOrdersFromDB();
      if (!result || result.length === 0) {
        throw new Error('Order not found');
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
