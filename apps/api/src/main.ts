import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@bankimonline/logger';
import { AppModule } from './app.module';
import { CacheWarmupService } from './modules/content/cache-warmup.service';

async function bootstrap() {
  const t0 = Date.now();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  logger.log(`NestFactory.create completed in ${Date.now() - t0}ms`, 'Bootstrap');

  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  const corsOrigins = configService.get<string>('CORS_ALLOWED_ORIGINS');
  const nodeEnv = configService.get<string>('NODE_ENV');
  const isProduction = nodeEnv === 'production';

  if (isProduction || corsOrigins === '*') {
    app.enableCors({ origin: true, credentials: false });
  } else if (corsOrigins) {
    app.enableCors({
      origin: corsOrigins.split(',').map((url: string) => url.trim()),
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
  } else {
    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:8003',
        'https://bankimonline.com',
      ],
      credentials: false,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
  }

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = configService.get<number>('PORT') || 8003;
  const t1 = Date.now();
  await app.listen(port);
  logger.log(
    `app.listen completed in ${Date.now() - t1}ms (total: ${Date.now() - t0}ms)`,
    'Bootstrap',
  );
  logger.log(`Bankimonline API running on port ${port}`, 'Bootstrap');

  const redisHost = configService.get<string>('REDIS_HOST');
  if (redisHost) {
    logger.log(
      `Content cache: Redis (${redisHost}:${configService.get<number>('REDIS_PORT') ?? 6379})`,
      'Bootstrap',
    );
  } else {
    logger.log(
      'Content cache: in-memory (set REDIS_HOST to use Redis)',
      'Bootstrap',
    );
  }

  // Warmup runs in background: pre-fills Redis. API already reads from Redis (cache-aside);
  // on cache miss it loads from DB and sets Redis, so traffic is served with or without warmup.
  const warmup = app.get(CacheWarmupService);
  warmup.warm().catch((err: Error) => {
    logger.error(
      err?.message ?? 'Cache warmup failed',
      err?.stack,
      'Bootstrap',
    );
  });
}

void bootstrap();
