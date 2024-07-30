// import request from 'supertest';
// import app from '../app';
// import { mockFetchOrders } from '../services/orderService';

// // Mock the order fetching function
// jest.mock('../services/orderService');

// describe('Order API', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });

//   test('should fetch orders', async () => {
//     const mockOrders = [
//       {
//         id: '1',
//         orderDate: '2024-07-29T00:00:00Z',
//         customerName: 'John Doe',
//         staffName: 'Jane Smith',
//         total: 100,
//         commission: 3,
//       },
//     ];

//     (mockFetchOrders as jest.Mock).mockResolvedValue(mockOrders);

//     const response = await request(app).get('/api/orders');

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockOrders);
//   });

//   test('should trigger sync', async () => {
//     const response = await request(app).post('/api/orders/sync');

//     expect(response.status).toBe(200);
//   });
// });
