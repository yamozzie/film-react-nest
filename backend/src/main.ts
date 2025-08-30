import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './middlewares/dev.logger';
import { JsonLogger } from './middlewares/json.logger';
import { TSKVLogger } from './middlewares/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const config = app.get('CONFIG');

  if (config.logger !== 'none') {
    app.useLogger(
      config.mode === 'dev'
        ? new DevLogger()
        : config.mode === 'prod' && config.logger === 'json'
          ? new JsonLogger()
          : config.mode === 'prod' && config.logger === 'tskv'
            ? new TSKVLogger()
            : undefined,
    );
  }

  await app.listen(3000);
}
bootstrap();
