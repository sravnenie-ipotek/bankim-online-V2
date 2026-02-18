import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    private readonly config: ConfigService,
    @InjectDataSource('content') private readonly contentDs: DataSource,
  ) {}

  getServerMode() {
    const dbUrl = this.config.get<string>('DATABASE_URL') || '';
    const isRailway = dbUrl.includes('railway');

    if (isRailway) {
      return {
        mode: 'railway',
        server: 'railway',
        file: 'nest-api (Railway Cloud)',
        warning: true,
        message: 'RAILWAY MODE - CLOUD DATABASE',
        status: 'PRODUCTION',
        recommendedSwitch: 'Use local DB for development',
      };
    }
    return {
      mode: 'local',
      server: 'local',
      file: 'nest-api (Local)',
      warning: false,
      message: 'LOCAL MODE - DEVELOPMENT DATABASE',
      status: 'DEVELOPMENT',
    };
  }

  getHealth() {
    const dbUrl = this.config.get<string>('DATABASE_URL') || '';
    const isRailway = dbUrl.includes('railway') || dbUrl.includes('rlwy.net');

    return {
      status: 'ok',
      database: isRailway ? 'railway' : 'local',
      databaseHost: isRailway ? 'railway.app' : 'localhost',
      version: '6.0.0-nest',
      timestamp: new Date().toISOString(),
      environment: this.config.get<string>('NODE_ENV') || 'development',
      corsEnabled: true,
    };
  }

  async getContentDbHealth() {
    try {
      // eslint-disable-next-line no-restricted-syntax -- bare SELECT NOW()/version() has no FROM; QueryBuilder requires a main alias
      const rows = await this.contentDs.manager.query<
        Array<{ current_time: string; db_version: string }>
      >('SELECT NOW() AS current_time, version() AS db_version');
      const row = rows[0];
      return {
        status: 'ok',
        message: 'Content database connected successfully',
        database: 'content_db_connected',
        timestamp: row.current_time,
        version:
          row.db_version.split(' ')[0] + ' ' + row.db_version.split(' ')[1],
        environment: this.config.get<string>('NODE_ENV') || 'development',
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return {
        status: 'error',
        message: 'Content database connection failed',
        error: message,
      };
    }
  }

  async getContentDbTest() {
    try {
      // eslint-disable-next-line no-restricted-syntax -- bare SELECT NOW() has no FROM; QueryBuilder requires a main alias
      const rows = await this.contentDs.manager.query<
        Array<{ current_time: string }>
      >('SELECT NOW() AS current_time');
      return {
        status: 'ok',
        message: 'Content database test successful',
        timestamp: rows[0].current_time,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { status: 'error', message, error: message };
    }
  }

  async getContentDbTables() {
    try {
      const result = await this.contentDs
        .createQueryBuilder()
        .select('table_name')
        .from('information_schema.tables', 'tables')
        .where('table_schema = :schema', { schema: 'public' })
        .orderBy('table_name')
        .getRawMany<{ table_name: string }>();

      return {
        status: 'ok',
        tables: result.map((r) => r.table_name),
        count: result.length,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { status: 'error', message, error: message };
    }
  }
}
