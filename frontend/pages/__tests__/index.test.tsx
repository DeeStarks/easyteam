import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HomePage', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.resetAllMocks();
  });

  test('renders the page and displays the table', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          orderDate: '2024-07-29T00:00:00Z',
          customerName: 'John Doe',
          staffName: 'Jane Smith',
          total: 100,
          commission: 3,
        },
      ],
    });

    render(<HomePage />);

    // Check if table headings are present
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Order Date')).toBeInTheDocument();
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Attributed Staff Name')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Commission in Dollars')).toBeInTheDocument();

    // Wait for data to be displayed
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('07/29/2024')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('$100.00')).toBeInTheDocument();
      expect(screen.getByText('$3.00')).toBeInTheDocument();
    });
  });

  test('handles filter input changes', () => {
    render(<HomePage />);

    const staffInput = screen.getByLabelText(/Staff/i);
    fireEvent.change(staffInput, { target: { value: 'Jane Smith' } });
    expect(staffInput).toHaveValue('Jane Smith');
  });

  test('sync button triggers data sync', async () => {
    // Mock API responses
    mockedAxios.post.mockResolvedValue({ status: 200 });
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          orderDate: '2024-07-29T00:00:00Z',
          customerName: 'John Doe',
          staffName: 'Jane Smith',
          total: 100,
          commission: 3,
        },
      ],
    });

    render(<HomePage />);

    // Simulate sync button click
    fireEvent.click(screen.getByText('Sync'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/sync`);
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });
});
