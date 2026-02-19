import { Queue, Job, QueueOptions, BulkJobOptions } from 'bullmq';
import { RedisClient } from '../../core/redis/redis';
import type { Redis } from 'ioredis';
import { Logger } from '../../core/logger/logger';

export class QueueService<
  DataTypeOrJob,
  ResultType,
  NameType extends string
> {
  private queue: Queue<DataTypeOrJob, ResultType, NameType, DataTypeOrJob, ResultType, NameType>;
  protected logger: Logger;

  protected constructor(queueName: string, options?: Partial<QueueOptions>) {
    this.logger = new Logger(`Queue:${queueName}`);
    const connection: Redis = RedisClient.getInstance().client;

    this.queue = new Queue<DataTypeOrJob, ResultType, NameType, DataTypeOrJob, ResultType, NameType>(
      queueName,
      {
        connection,
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 1000 },
          removeOnComplete: true,
        },
        ...options,
      }
    );
  }

  public async close(): Promise<void> {
    this.logger.info('Closing queue connection...');
    await this.queue.close();
  }

  public async addBulk(
    jobs: { name: NameType; data: DataTypeOrJob; opts?: BulkJobOptions }[]
  ): Promise<Job<DataTypeOrJob, ResultType, NameType>[]> {
    if (jobs.length === 0) return [];

    try {
      this.logger.debug(`Adding bulk jobs: ${jobs.length}`);
      return await this.queue.addBulk(jobs);
    } catch (err) {
      this.logger.error('Failed to add bulk jobs', err);
      throw err;
    }
  }

  public async addJob(
    name: NameType,
    data: DataTypeOrJob,
    opts?: BulkJobOptions
  ): Promise<Job<DataTypeOrJob, ResultType, NameType>> {
    const results = await this.addBulk([{ name, data, opts }]);

    if (!results || results.length === 0) {
      throw new Error(`Failed to create job: ${name}`);
    }

    return results[0];
  }

  public get instance() {
    return this.queue;
  }
}
