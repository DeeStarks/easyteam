import { Request, Response } from 'express';
import { syncOrders } from '../services/orderService';

export const syncOrdersHandler = async (req: Request, res: Response) => {
  try {
    await syncOrders();
    res.status(200).send('Data synced successfully');
  } catch (error) {
    res.status(500).json({ message: 'Error syncing orders' });
  }
};
