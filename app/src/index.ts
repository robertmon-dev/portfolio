import { AppInitializer } from "./initializers/appInitializer";
import type { AppRouter } from "./routers/app";
import { Logger } from "./core/logger/logger";

const logger = new Logger("Main");
const app = new AppInitializer();

async function start() {
  await app.bootstrap();
}

start();

const signals: string[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

signals.forEach((signal) => {
  process.on(signal, async () => {
    const forceExit = setTimeout(() => {
      logger.error("Shutdown timed out. Forcing exit.");
      process.exit(1);
    }, 10000);

    await app.shutdown(signal);

    clearTimeout(forceExit);
    process.exit(0);
  });
});

export type { AppRouter };
