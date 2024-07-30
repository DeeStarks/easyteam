## Overview

The backend service handles order data and commissions, interacting with Shopify and providing endpoints for the frontend application. It includes functionality for hourly data synchronization and manual refresh.

## Testing
```bash
npm test
```

## API Endpoints
```bash
GET /api/orders: Fetch orders with commissions.
POST /api/orders/sync: Trigger manual sync with Shopify.
```

## Usage

> Copy the `.env.example` file to `.env` and update the values as needed.

### Docker
To run with Docker, use docker-compose:
```bash
docker-compose up
```
