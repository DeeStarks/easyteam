import { createClient } from 'redis';

class RedisLock {
    private client: any;
    
    constructor(client: any) {
        this.client = client;
    }
    
    async acquireLock(lockKey: string, lockValue: string): Promise<boolean> {
        const result = await this.client.set(lockKey, lockValue, 'NX', 'EX', 300);
        return result === 'OK';
    }
    
    async releaseLock(lockKey: string, lockValue: string): Promise<void> {
        const currentValue = await this.client.get(lockKey);
        if (currentValue === lockValue) {
            await this.client.del(lockKey);
        }
    }
}

export default RedisLock;
