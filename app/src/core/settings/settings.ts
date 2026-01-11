import { envSchema } from './schemas';
import type { EnvConfig } from './types';
import dotenv from 'dotenv';

dotenv.config();

export class Settings {
  private static instance: Settings;
  public readonly config: EnvConfig;

  private constructor() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
      console.error('Invalid environment variables:', result.error.format());
      process.exit(1);
    }

    this.config = result.data;
  }

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}
