import { Worker, Job, WorkerOptions } from 'bullmq';
import { RedisClient } from '../../core/redis/redis';
import type { Redis } from 'ioredis';
import { Logger } from '../../core/logger/logger';

export abstract class BaseWorker<
  TActionMap extends object,
  ResultType,
  NameType extends string & keyof TActionMap
> {
  protected worker: Worker<TActionMap[NameType], ResultType, NameType>;
  protected logger: Logger;

  protected constructor(queueName: string, options?: Partial<WorkerOptions>) {
    this.logger = new Logger(`Worker:${queueName}`);
    const connection: Redis = RedisClient.getInstance().client;

    this.worker = new Worker<TActionMap[NameType], ResultType, NameType>(
      queueName,
      async (job) => {
        this.logger.info(`Processing job ${job.id} (${job.name})`);
        return this.process(job);
      },
      { connection, ...options }
    );
  }

  protected abstract process(job: Job<TActionMap[NameType], ResultType, NameType>): Promise<ResultType>;

  public async close(): Promise<void> {
    await this.worker.close();
  }
}
