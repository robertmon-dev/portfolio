import { z } from 'zod';
import * as d from '../schemas/diagnostics';

export type HealtCheckReponse = z.infer<typeof d.HealthResponseSchema>;
