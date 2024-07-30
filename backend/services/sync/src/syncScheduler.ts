import axios from 'axios';
import { CronJob } from 'cron';
import { configDotenv } from 'dotenv';

configDotenv();

const syncEndpoint = `${process.env.MAIN_SERVICE_HOST}/api/orders/sync`;

export const scheduleSync = () => {
  // Schedule a task to run every hour
    const job = new CronJob('0 */1 * * *', async () => {
        try {
            console.log('Syncing data with Shopify...');
            await axios.post(syncEndpoint);
            console.log('Data sync completed.');
        } catch (error: any) {
            console.error('Error syncing data:', error.message);
        }
    });
    
    job.start();
};
