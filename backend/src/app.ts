import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/orders', orderRoutes);

export default app;
