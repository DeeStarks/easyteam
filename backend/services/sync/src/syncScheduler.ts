import axios from 'axios';
import { CronJob } from 'cron';
import { configDotenv } from 'dotenv';
import { createClient } from 'redis';
import RedisLock from './utils/redisLock';

configDotenv();

const redisClient = createClient({
    url: process.env.REDIS_URL,
});
redisClient.on('error', (error) => {
    console.error('Redis error:', error);
})
redisClient.connect();

const redisLock = new RedisLock(redisClient);
const syncEndpoint = `${process.env.MAIN_SERVICE_HOST}/api/orders/sync`;

export const scheduleSync = async () => {
    const lockKey = 'sync_lock';
    const lockValue = `${Math.random()}`;

    // Schedule a task to run every hour
    const job = new CronJob('0 */1 * * *', async () => {
        try {
            const lockAcquired = await redisLock.acquireLock(lockKey, lockValue);
            if (!lockAcquired) {
                console.log('Another sync is in progress, skipping this run.');
                return;
            }

            console.log('Syncing data with Shopify...');
            await axios.post(syncEndpoint);
            console.log('Data sync completed.');
        } catch (error: any) {
            console.error('Error syncing data:', error.message);
        } finally {
            await redisLock.releaseLock(lockKey, lockValue);
        }
    });
    
    job.start();
};
