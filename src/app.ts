import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// app routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Order management application');
};

app.get('/', getAController);

// Not Found
app.use(notFound);

export default app;
