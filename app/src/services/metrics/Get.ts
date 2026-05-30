import { BaseService } from "../service";
import { Metrics } from "../../core/metrics/metrics";

export class MetricsService extends BaseService {
  public async execute(): Promise<string> {
    const metrics = Metrics.getInstance();

    return await metrics.getMetrics();
  }
}
