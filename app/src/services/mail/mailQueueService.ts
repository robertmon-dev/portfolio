import { BulkJobOptions, Job, QueueOptions } from "bullmq";
import { QueueService } from "../../infrastructure/queue/QueueService";
import type { MailSend, MailSendJob, MailSendResult, Queueing } from "./types";

export class MailQueueService
  extends QueueService<MailSendJob, MailSendResult, MailSend>
  implements Queueing<MailSendJob, MailSendResult, MailSend> {
  private static instance: MailQueueService;

  private constructor(options?: Partial<QueueOptions>) {
    super("Mail Queue Service", options);
  }

  public static getInstance(): MailQueueService {
    if (!MailQueueService.instance) {
      MailQueueService.instance = new MailQueueService();
    }

    return MailQueueService.instance;
  }

  public override async addJob(
    name: MailSend,
    data: MailSendJob,
    opts?: BulkJobOptions
  ): Promise<Job<MailSendJob, MailSendResult, MailSend>> {
    this.logger.debug(`Adding job for mail`);
    return await super.addJob(name, data, opts);
  }

  public override async addBulk(
    jobs: { name: MailSend; data: MailSendJob; opts?: BulkJobOptions; }[]
  ): Promise<Job<MailSendJob, MailSendResult, MailSend>[]> {
    this.logger.debug(`Batching ${jobs.length} emails...`);
    return await super.addBulk(jobs);
  }
}
