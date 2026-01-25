import { AppInitializer } from './initializers/appInitializer';
import { Logger } from './core/logger/logger';
export type { AppRouter } from './routers/app';

const logger = new Logger('Bootstrap');
export const app = new AppInitializer();

const start = async () => {
  try {
    await app.bootstrap();
  } catch (error) {
    logger.error('Critical failure during startup', error);
    process.exit(1);
  }
};

start();

const handleSignal = async (signal: string) => {
  try {
    await app.shutdown(signal);
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => handleSignal('SIGINT'));
process.on('SIGTERM', () => handleSignal('SIGTERM'));
