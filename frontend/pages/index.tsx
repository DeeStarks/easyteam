import { useState, useEffect } from 'react';
import { Page, Layout, Card, DataTable, Button, Filters, TextField } from '@shopify/polaris';
import axios from 'axios';

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [customerFilter, setCustomerFilter] = useState('');
  const [staffFilter, setStaffFilter] = useState('');
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: '', end: '' });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const syncOrders = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/sync`);
      fetchOrders();
    } catch (error) {
      console.error('Error syncing orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders
  .filter((order: any) => customerFilter === '' || order.customerName.includes(customerFilter))
  .filter((order: any) => staffFilter === '' || order.staffName.includes(staffFilter))
  .filter((order: any) => {
    const orderDate = new Date(order.orderDate);
    const startDate = dateRangeFilter.start ? new Date(dateRangeFilter.start) : null;
    const endDate = dateRangeFilter.end ? new Date(dateRangeFilter.end) : null;
    return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
  });

const rows = filteredOrders.map((order: any) => [
  order.id,
  new Date(order.orderDate).toLocaleDateString(),
  order.customerName,
  order.staffName,
  `$${order.total.toFixed(2)}`,
  `$${order.commission.toFixed(2)}`,
]);

  return (
    <Page title="Orders">
      <Layout>
        <Layout.Section>
          <Card>
            <Filters
              queryValue={customerFilter}
              onQueryChange={setCustomerFilter}
              onQueryClear={() => setCustomerFilter('')}
              onClearAll={() => {
                setCustomerFilter('');
                setStaffFilter('');
                setDateRangeFilter({ start: '', end: '' });
              }}
              filters={[
                {
                  key: 'staff',
                  label: 'Staff',
                  filter: (
                    <TextField
                      value={staffFilter}
                      onChange={setStaffFilter}
                      label="Staff"
                      labelHidden
                      autoComplete="off"
                    />
                  ),
                  shortcut: true,
                },
                {
                  key: 'dateRange',
                  label: 'Date Range',
                  filter: (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <TextField
                        type="date"
                        value={dateRangeFilter.start}
                        onChange={(value) => setDateRangeFilter({ ...dateRangeFilter, start: value })}
                        label="Start Date"
                        labelHidden
                        autoComplete="off"
                      />
                      <TextField
                        type="date"
                        value={dateRangeFilter.end}
                        onChange={(value) => setDateRangeFilter({ ...dateRangeFilter, end: value })}
                        label="End Date"
                        labelHidden
                        autoComplete="off"
                      />
                    </div>
                  ),
                  shortcut: true,
                },
              ]}
            >
              <Button onClick={syncOrders}>Sync</Button>
            </Filters>
            <DataTable
              columnContentTypes={[
                'text',
                'text',
                'text',
                'text',
                'numeric',
                'numeric',
              ]}
              headings={[
                'ID',
                'Order Date',
                'Customer Name',
                'Attributed Staff Name',
                'Total',
                'Commission in Dollars',
              ]}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomePage;
