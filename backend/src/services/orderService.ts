import Order from '../models/orderModel';
import { fetchShopifyData } from './shopifyService';
import { CommissionCalculator } from './commissionCalculator';

export const getAllOrders = async () => {
  return await Order.find();
};

export const syncOrders = async () => {
  const data = await fetchShopifyData();
  var orders = data.map((order: any) => ({
    id: order.id,
    orderDate: new Date(order.created_at),
    customerName: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Unknown',
    staffName: order.name,
    total: order.total_price
  }));

  // calculating commission for each order
  const calculator = new CommissionCalculator();
  orders = orders.map(order => ({
    ...order,
    commission: calculator.calculate(order, orders)
  }));

  // inserting only new orders
  const existingOrders = await Order.find();
  const newOrders = orders.filter(order => !existingOrders.some(existingOrder => existingOrder.id === order.id));
  await Order.insertMany(newOrders);
};

export const mockFetchOrders = async () => {
  return [
    {
      id: '1',
      orderDate: '2024-07-29T00:00:00Z',
      customerName: 'John Doe',
      staffName: 'Jane Smith',
      total: 100,
      commission: 3,
    },
    {
      id: '2',
      orderDate: '2024-07-30T00:00:00Z',
      customerName: 'Alice Johnson',
      staffName: 'Bob Brown',
      total: 200,
      commission: 6,
    },
    {
      id: '3',
      orderDate: '2024-07-31T00:00:00Z',
      customerName: 'Charlie Williams',
      staffName: 'David White',
      total: 300,
      commission: 9,
    }
  ];
}
