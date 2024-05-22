import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// app routes
app.use('/api/products', ProductRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('hello world');
};

app.get('/', getAController);

export default app;
