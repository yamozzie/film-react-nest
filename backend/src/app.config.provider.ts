import { ConfigModule } from '@nestjs/config';

export const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER ?? 'mongodb',
      url: process.env.DATABASE_URL,
    },
    mode: process.env.MODE,
    logger: process.env.LOGGER,
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  mode: string;
  logger: string;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
