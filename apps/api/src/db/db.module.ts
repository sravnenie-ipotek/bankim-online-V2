import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService, TypeOrmWinstonLogger } from '@bankimonline/logger';

/**
 * Database module providing two TypeORM DataSources:
 *   - default (main): banks, clients, applications, etc.
 *   - content: content items, translations, dropdowns
 */
@Global()
@Module({
  imports: [
    // Main database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService, LoggerService],
      useFactory: (config: ConfigService, logger: LoggerService) => {
        const url = config.get<string>('DATABASE_URL');
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        const ssl = getSslConfig(url, isProduction);

        return {
          type: 'postgres',
          url,
          ssl,
          autoLoadEntities: true,
          synchronize: false, // NEVER auto-sync in production
          logging: !isProduction,
          logger: new TypeOrmWinstonLogger(logger),
          extra: {
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: isProduction ? 10000 : 5000,
          },
        };
      },
    }),

    // Content database connection
    TypeOrmModule.forRootAsync({
      name: 'content',
      imports: [ConfigModule],
      inject: [ConfigService, LoggerService],
      useFactory: (config: ConfigService, logger: LoggerService) => {
        const url = config.get<string>('CONTENT_DATABASE_URL');
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        const ssl = getSslConfig(url, isProduction);

        return {
          type: 'postgres',
          url,
          ssl,
          autoLoadEntities: true,
          synchronize: false,
          logging: !isProduction,
          logger: new TypeOrmWinstonLogger(logger),
          extra: {
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: isProduction ? 10000 : 5000,
          },
        };
      },
    }),
  ],
})
export class DbModule {}

/**
 * Determine SSL configuration based on connection URL and environment.
 * Ported from server/config/database-core.js
 */
function getSslConfig(
  connectionString: string | undefined,
  isProduction: boolean,
): boolean | { rejectUnauthorized: boolean } {
  if (!connectionString) return false;
  if (isProduction) return false;

  try {
    const url = new URL(connectionString);
    const host = (url.hostname || '').toLowerCase();
    const params = new URLSearchParams(url.search || '');
    const sslmode = (params.get('sslmode') || '').toLowerCase();

    if (sslmode === 'disable') return false;
    if (sslmode === 'require') return { rejectUnauthorized: false };

    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (isLocal) return false;

    return { rejectUnauthorized: false };
  } catch {
    return { rejectUnauthorized: false };
  }
}
