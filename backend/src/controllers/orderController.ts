import { Request, Response } from 'express';
import { getAllOrders } from '../services/orderService';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};
